import "server-only";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import fs from "fs";
import path from "path";
import { appendSubmission, readSubmissions, detectCategory } from "@/app/admin/(dashboard)/contacts/_helpers";
import { writeJSON } from "@/lib/data-store";

export interface ImapSyncResult {
  success: boolean;
  syncedCount: number;
  skippedSpamCount?: number;
  message: string;
  error?: string;
  requiresConfig?: boolean;
}

const SKIP_DOMAINS = new Set([
  "linkedin.com", "redditmail.com", "zoom.us", "e.zoom.us", "surveoo.com", "adobe.com", "e.adobe.com",
  "render.com", "clay.com", "relume.io", "ycombinator.com", "unstop.news", "emergent.sh",
  "instagram.com", "facebookmail.com", "twitter.com", "x.com", "groww.in", "futurepedia.io",
  "thegates.biz", "bunny.net", "imagekit.io", "genspark.ai", "dribbble.com", "amazon.com",
  "amazonses.com", "google.com", "accounts.google.com", "github.com", "gitlab.com",
  "medium.com", "substack.com", "canva.com", "figma.com", "notion.so", "apple.com",
  "spotify.com", "uber.com", "swiggy.in", "zomato.com", "cred.club", "zepto.com",
  "blinkit.com", "ola.in", "airtel.com", "jio.com", "tender18mail.in", "falconide.com",
  "beehiiv.com", "freshmarketer.com", "customer.io", "mailchimp.com", "sendgrid.net",
  "anthropic.com", "mail.anthropic.com", "cloudinary.com"
]);

function isAutomatedSender(address: string, name: string): boolean {
  const addr = (address || "").toLowerCase();
  const n = (name || "").toLowerCase();

  for (const d of SKIP_DOMAINS) {
    if (addr.includes(d) || n.includes(d)) return true;
  }

  if (/^(no-?reply|donotreply|notifications?|alerts?|updates?|news(letter)?|marketing|digest|bounce|mailer-daemon|billing|support@|teamzoom)/i.test(addr)) {
    return true;
  }

  if (/^(reddit|linkedin|zoom|render|groww|adobe|github|google|instagram|dribbble|surveoo|clay|relume|medium|substack)/i.test(n)) {
    return true;
  }

  return false;
}

function hasUnsubscribeContent(parsed: any): boolean {
  // 1. Header checks
  if (parsed.headers) {
    if (parsed.headers.get("list-unsubscribe")) return true;
    if (parsed.headers.get("list-id")) return true;
    const prec = String(parsed.headers.get("precedence") || "").toLowerCase();
    if (prec === "bulk" || prec === "list" || prec === "junk") return true;
    const auto = String(parsed.headers.get("auto-submitted") || "").toLowerCase();
    if (auto && auto !== "no") return true;
  }

  // 2. Body checks
  const body = ((parsed.text || "") + " " + (parsed.html || "")).toLowerCase();
  if (
    body.includes("unsubscribe") ||
    body.includes("opt-out") ||
    body.includes("opt out") ||
    body.includes("manage your preferences") ||
    body.includes("manage preferences") ||
    body.includes("email preferences") ||
    body.includes("view in browser") ||
    body.includes("view this email in your browser")
  ) {
    return true;
  }

  return false;
}

function cleanEmailBody(rawText: string): string {
  if (!rawText) return "";
  let cleaned = rawText.replace(/https?:\/\/[^\s]{45,}/g, "[link]");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();
  return cleaned;
}

function formatFileSize(bytes: number): string {
  if (!bytes || isNaN(bytes)) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function syncImapInbox(): Promise<ImapSyncResult> {
  const host = process.env.IMAP_HOST || "imap.gmail.com";
  const port = parseInt(process.env.IMAP_PORT || "993", 10);
  const secure = process.env.IMAP_SECURE !== "false";
  const user = (process.env.IMAP_USER || "comfinityindia@gmail.com").trim();
  const rawPass = process.env.IMAP_PASSWORD || "";
  const pass = rawPass.replace(/\s+/g, "").trim();

  if (!pass) {
    return {
      success: false,
      syncedCount: 0,
      requiresConfig: true,
      message: "Gmail App Password not configured.",
      error: "Please set IMAP_PASSWORD in your .env file with a 16-character Google App Password.",
    };
  }

  const client = new ImapFlow({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    logger: false,
    emitLogs: false,
  });

  try {
    await client.connect();
  } catch (connErr: any) {
    console.error("IMAP Connection Error:", connErr);
    const resp = String(connErr?.response || connErr?.message || "");
    const isAuthFailed = resp.includes("AUTHENTICATIONFAILED") || resp.includes("Invalid credentials") || resp.includes("Command failed");

    const diagError = isAuthFailed
      ? `Invalid credentials for ${user}. Please verify: 1) The App Password was created under "${user}", 2) "Enable IMAP" is checked in Gmail Settings > Forwarding and POP/IMAP.`
      : connErr?.message || "Could not connect to IMAP server.";

    return {
      success: false,
      syncedCount: 0,
      requiresConfig: true,
      message: "Could not authenticate with Gmail.",
      error: diagError,
    };
  }

  let lock: any = null;
  let syncedCount = 0;
  let skippedSpamCount = 0;

  try {
    lock = await client.getMailboxLock("INBOX");

    const existing = readSubmissions();
    const existingIds = new Set(existing.map((s) => s.externalMessageId).filter(Boolean));

    const status = await client.status("INBOX", { messages: true });
    const total = status.messages || 0;
    const scanCount = Math.min(total, 500);
    const start = Math.max(1, total - scanCount + 1);

    const seqRange = `${start}:${total}`;
    const candidateSeqs: number[] = [];

    // Fast envelope scan
    for await (const msg of client.fetch(seqRange, { envelope: true })) {
      const fromAddr = (msg.envelope?.from?.[0]?.address || "").toLowerCase();
      const fromName = (msg.envelope?.from?.[0]?.name || "").toLowerCase();
      const subject = (msg.envelope?.subject || "").toLowerCase();

      // Skip automated bot senders & domains
      if (isAutomatedSender(fromAddr, fromName)) continue;

      // Skip bank transaction alerts & OTP security codes
      if (fromAddr.includes("canarabank.com") && (subject.includes("transaction") || subject.includes("alert") || subject.includes("upi") || subject.includes("neft"))) {
        continue;
      }
      if (subject.includes("verification code") || subject.includes("security alert") || subject.includes("confirm your") || subject.includes("password reset")) {
        continue;
      }

      candidateSeqs.push(msg.seq);
    }

    if (candidateSeqs.length === 0) {
      return {
        success: true,
        syncedCount: 0,
        message: "No new client emails found in your mailbox.",
      };
    }

    const docsDir = path.join(process.cwd(), "public", "uploads", "docs");
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    // Inspect candidate messages (newest first)
    for (const seq of candidateSeqs.reverse()) {
      const message = await client.fetchOne(seq, { source: true, uid: true });
      if (!message || !message.source) continue;

      const parsed = await simpleParser(message.source);
      const messageId = parsed.messageId || `imap_uid_${message.uid}`;

      // Skip if already in database
      if (existingIds.has(messageId)) {
        continue;
      }

      // ── STRICT RULE: Skip if contains subscribe / unsubscribe or automated newsletter header ──
      if (hasUnsubscribeContent(parsed)) {
        skippedSpamCount++;
        continue;
      }

      const senderName =
        parsed.from?.value?.[0]?.name ||
        parsed.from?.value?.[0]?.address ||
        "Client Email";
      const senderEmail = parsed.from?.value?.[0]?.address || user;
      const subject = parsed.subject || "No Subject";
      const rawText = parsed.text || (parsed.html ? parsed.html.replace(/<[^>]*>?/gm, "").trim() : "");
      const cleanBody = cleanEmailBody(rawText);

      // ── Attachment extraction (PDF, DOCX, XLSX, ZIP, image) ──
      let documentUrl: string | undefined = undefined;
      let documentName: string | undefined = undefined;
      let documentSize: string | undefined = undefined;

      if (parsed.attachments && parsed.attachments.length > 0) {
        for (const att of parsed.attachments) {
          if (att.content && att.filename) {
            // Ignore calendar invite attachments (.ics) and tiny tracking signature pixels under 5KB
            if (/\.ics$/i.test(att.filename)) continue;
            if (att.size && att.size < 5000 && /\.(png|jpe?g|gif)$/i.test(att.filename)) continue;

            const cleanName = att.filename.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
            const uniqueName = `real_${Date.now()}_${cleanName}`;
            fs.writeFileSync(path.join(docsDir, uniqueName), att.content);

            documentUrl = `/uploads/docs/${uniqueName}`;
            documentName = att.filename;
            documentSize = formatFileSize(att.size);
            break; // take first primary document
          }
        }
      }

      // Smart category classification
      const lowerSub = subject.toLowerCase();
      let category: "client_doc" | "client_meet" | "job_intern" | "general" = "general";
      if (documentUrl || lowerSub.includes("prd") || lowerSub.includes("eoi") || lowerSub.includes("rfp") || lowerSub.includes("spec") || lowerSub.includes("scope") || lowerSub.includes("document") || lowerSub.includes("brief")) {
        category = "client_doc";
      } else if (lowerSub.includes("intern") || lowerSub.includes("resume") || lowerSub.includes("role") || lowerSub.includes("career") || lowerSub.includes("cv") || lowerSub.includes("hiring") || lowerSub.includes("application")) {
        category = "job_intern";
      } else if (lowerSub.includes("meet") || lowerSub.includes("discussion") || lowerSub.includes("interview") || lowerSub.includes("call") || lowerSub.includes("invitation")) {
        category = "client_meet";
      }

      appendSubmission({
        name: senderName,
        email: senderEmail,
        subject,
        documentUrl,
        documentName,
        documentSize,
        category,
        message: cleanBody.slice(0, 3000),
        source: "gmail_imap",
        externalMessageId: messageId,
      });

      existingIds.add(messageId);
      syncedCount++;
    }

    return {
      success: true,
      syncedCount,
      skippedSpamCount,
      message:
        syncedCount > 0
          ? `Synced ${syncedCount} real human client email${syncedCount === 1 ? "" : "s"} & documents (filtered out ${skippedSpamCount} newsletters)!`
          : "Your inbox is up to date with all real client emails.",
    };
  } catch (err: any) {
    console.error("Error during IMAP sync:", err);
    return {
      success: false,
      syncedCount,
      message: "Failed while downloading emails from Gmail.",
      error: err?.message || String(err),
    };
  } finally {
    if (lock) {
      try {
        lock.release();
      } catch {}
    }
    try {
      await client.logout();
    } catch {}
  }
}

export function purgeSpamSubmissions(): { removed: number; remaining: number } {
  const FILE = "contact-submissions.json";
  const submissions = readSubmissions();
  const cleaned = submissions.filter((s) => {
    const email = (s.email || "").toLowerCase();
    const name = (s.name || "").toLowerCase();
    const msg = (s.message || "").toLowerCase();
    if (isAutomatedSender(email, name)) return false;
    if (msg.includes("unsubscribe") || msg.includes("opt out") || msg.includes("manage preferences")) return false;
    return true;
  });

  const removed = submissions.length - cleaned.length;
  writeJSON(FILE, cleaned);
  return { removed, remaining: cleaned.length };
}
