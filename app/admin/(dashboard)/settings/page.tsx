"use client"

import { useState } from "react"

export default function SettingsPage() {
  const [copied, setCopied] = useState(false)
  const [hashResult, setHashResult] = useState("")
  const [pwd, setPwd] = useState("")

  async function generateHash() {
    if (!pwd) return
    const res = await fetch("/api/admin/hash-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    })
    if (res.ok) {
      const { hash } = await res.json()
      setHashResult(hash)
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">Admin / Settings</p>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage admin credentials and site configuration.</p>
      </div>

      {/* Change Password Section */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 mb-6">
        <h2 className="text-base font-medium text-white mb-1">Change Admin Password</h2>
        <p className="text-xs text-neutral-500 mb-4">
          Generate a new bcrypt hash, then update <code className="bg-neutral-800 px-1 rounded text-neutral-300">.env</code> → <code className="bg-neutral-800 px-1 rounded text-neutral-300">ADMIN_PASSWORD_HASH</code> and restart the server.
        </p>
        <div className="flex gap-3">
          <input
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            placeholder="New password"
            className="flex-1 rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition"
          />
          <button
            onClick={generateHash}
            className="text-sm bg-white text-black font-medium px-4 py-2.5 rounded-lg hover:bg-neutral-100 transition"
          >
            Generate Hash
          </button>
        </div>
        {hashResult && (
          <div className="mt-4 rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 flex items-center justify-between gap-3">
            <code className="text-xs text-green-400 break-all">{hashResult}</code>
            <button
              onClick={() => copyToClipboard(hashResult)}
              className="text-xs text-neutral-500 hover:text-white shrink-0 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {/* Cloudinary CDN Integration */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-medium text-white">Cloudinary Image CDN</h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">
            Auto Link Generator
          </span>
        </div>
        <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
          When Cloudinary is configured, any image you upload in the Magazine or Projects editor is automatically uploaded to your Cloudinary cloud and converted into a permanent CDN HTTPS link.
        </p>

        <div className="rounded-lg bg-neutral-800/80 border border-neutral-700/60 p-4 space-y-2 mb-4">
          <p className="text-xs font-semibold text-neutral-200">How to activate automatic Cloudinary links:</p>
          <ol className="text-xs text-neutral-400 list-decimal list-inside space-y-1">
            <li>Log into your free account at <a href="https://cloudinary.com/console" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">cloudinary.com/console</a></li>
            <li>Copy your <strong className="text-neutral-200">Cloud Name</strong>, <strong className="text-neutral-200">API Key</strong>, and <strong className="text-neutral-200">API Secret</strong></li>
            <li>Add them to your <code className="bg-neutral-900 px-1 py-0.5 rounded text-neutral-300">.env</code> file:</li>
          </ol>
          <pre className="bg-neutral-950 p-3 rounded text-[11px] font-mono text-green-400 overflow-x-auto mt-2">
CLOUDINARY_CLOUD_NAME=xnulqi5v&#10;CLOUDINARY_API_KEY=your_api_key&#10;CLOUDINARY_API_SECRET=your_api_secret
          </pre>
        </div>
      </div>

      {/* Gmail / IMAP Real Mailbox Integration */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-medium text-white">Gmail / Real Mailbox Integration (IMAP)</h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
            Direct IMAP Sync
          </span>
        </div>
        <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
          Connect your real mailbox (<code className="text-neutral-300">comfinityindia@gmail.com</code>) to pull unread emails, client consultation requests, and document attachments (PDFs, RFPs, briefs) straight into your Admin Inbox.
        </p>

        <div className="rounded-lg bg-neutral-800/80 border border-neutral-700/60 p-4 space-y-2 mb-4">
          <p className="text-xs font-semibold text-neutral-200">How to connect your Gmail in 60 seconds:</p>
          <ol className="text-xs text-neutral-400 list-decimal list-inside space-y-1.5 leading-relaxed">
            <li>Go to your Google Account Security: <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">myaccount.google.com/security</a></li>
            <li>Ensure <strong className="text-neutral-200">2-Step Verification</strong> is enabled for your Google account.</li>
            <li>Search for <strong className="text-neutral-200">&quot;App passwords&quot;</strong> in the search bar at the top of your Google Account.</li>
            <li>Create an app password named <strong className="text-neutral-200">&quot;Comfinity Admin&quot;</strong> and copy the 16-character code (e.g. <code className="text-emerald-400 font-mono">abcd efgh ijkl mnop</code>).</li>
            <li>Add it to your <code className="bg-neutral-900 px-1 py-0.5 rounded text-neutral-300">.env</code> file:</li>
          </ol>
          <pre className="bg-neutral-950 p-3 rounded text-[11px] font-mono text-emerald-400 overflow-x-auto mt-2">
IMAP_HOST=imap.gmail.com&#10;IMAP_PORT=993&#10;IMAP_SECURE=true&#10;IMAP_USER=comfinityindia@gmail.com&#10;IMAP_PASSWORD=your-16-char-app-password
          </pre>
          <p className="text-[11px] text-neutral-500 mt-2">
            💡 Once set, simply click the <strong className="text-neutral-300">&quot;🔄 Sync Real Mailbox&quot;</strong> button in your <a href="/admin/contacts" className="text-emerald-400 underline">Inbox</a> to pull all emails and attachments!
          </p>
        </div>
      </div>

      {/* Current Configuration */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 mb-6">
        <h2 className="text-base font-medium text-white mb-1">Current Configuration</h2>
        <p className="text-xs text-neutral-500 mb-4">These values are read from your <code className="bg-neutral-800 px-1 rounded text-neutral-300">.env</code> file at startup.</p>
        <div className="space-y-2">
          {[
            { label: "ADMIN_EMAIL", value: "Set in .env" },
            { label: "ADMIN_PASSWORD_HASH", value: "Set in .env (bcrypt hash)" },
            { label: "SESSION_SECRET", value: "Set in .env (signing key)" },
            { label: "CLOUDINARY_CLOUD_NAME", value: "Configured in .env" },
            { label: "CLOUDINARY_API_KEY", value: "Set in .env" },
            { label: "IMAP_HOST", value: "imap.gmail.com (Gmail)" },
            { label: "IMAP_USER", value: "comfinityindia@gmail.com" },
            { label: "IMAP_PASSWORD", value: "16-char App Password (.env)" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between rounded-lg bg-neutral-800 px-4 py-2.5">
              <code className="text-xs text-neutral-400">{item.label}</code>
              <span className="text-xs text-neutral-600">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Site Links */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="text-base font-medium text-white mb-4">Site Navigation</h2>
        <div className="grid grid-cols-2 gap-2">
          {["/", "/about", "/works", "/careers", "/contact", "/solutions", "/partners", "/labs", "/community", "/why-us"].map(path => (
            <a
              key={path}
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded-lg px-3 py-2 transition flex items-center justify-between"
            >
              <span>{path}</span>
              <span>↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}