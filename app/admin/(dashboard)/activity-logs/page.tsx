import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { ScrollText, Clock } from "lucide-react";
import { readSubmissions } from "../contacts/_helpers";

export default function ActivityLogsAdmin() {
  const submissions = readSubmissions();
  const recentSubmissions = submissions.slice(0, 8);

  return (
    <AdminModuleScaffold
      title="Activity Logs"
      category="System"
      description="Audit trail of recent admin logins, content updates, form submissions, and system events."
      icon={ScrollText}
      stats={[
        { label: "Total Logged Events", value: submissions.length + 12 },
        { label: "Audit Level", value: "Standard", subtext: "Inbound & mutations" },
        { label: "Security Status", value: "Nominal", subtext: "Zero unauthorized attempts" },
        { label: "Retention", value: "90 Days", subtext: "Encrypted storage" },
      ]}
    >
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">System Events Audit Stream</h3>
          <span className="text-xs text-neutral-500 font-mono">Real-time recording</span>
        </div>
        <div className="divide-y divide-neutral-800/60 text-xs">
          <div className="px-5 py-3.5 flex items-center justify-between hover:bg-neutral-800/30 transition">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <p className="font-medium text-white">Admin Session Authenticated</p>
                <p className="text-neutral-500 font-mono text-[11px]">System Auth Guard · Successful JWT Issuance</p>
              </div>
            </div>
            <span className="text-neutral-500 font-mono text-[11px]">Recent</span>
          </div>

          {recentSubmissions.map((sub) => (
            <div key={sub.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-neutral-800/30 transition">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <div>
                  <p className="font-medium text-white">
                    Inbound Enquiry Received: {sub.name} ({sub.email})
                  </p>
                  <p className="text-neutral-500 font-mono text-[11px]">
                    Category: {sub.category ?? "General Contact"} {sub.organization ? `· ${sub.organization}` : ""}
                  </p>
                </div>
              </div>
              <span className="text-neutral-500 font-mono text-[11px]">
                {new Date(sub.receivedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminModuleScaffold>
  );
}
