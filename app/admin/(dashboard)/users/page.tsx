import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { UserCog, ShieldCheck, KeyRound } from "lucide-react";
import { getAdminSession } from "@/lib/admin-session";

export default async function AdminUsersAdmin() {
  const session = await getAdminSession();

  return (
    <AdminModuleScaffold
      title="Admin Users"
      category="System"
      description="Manage administrative accounts, role-based access control (RBAC), and authentication security."
      icon={UserCog}
      stats={[
        { label: "Active Admins", value: "1 Account", subtext: "Super Administrator" },
        { label: "Auth Provider", value: "JWT + Bcrypt", subtext: "HttpOnly Cookie" },
        { label: "Session Security", value: "24-hour expiry", subtext: "Secure token" },
        { label: "Multi-Factor", value: "Ready", subtext: "Policy compliant" },
      ]}
    >
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Registered Administrators</h3>
          <span className="text-xs text-neutral-500 font-mono">1 active session</span>
        </div>
        <div className="divide-y divide-neutral-800/60">
          <div className="px-5 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold">
                {session?.email?.charAt(0).toUpperCase() ?? "A"}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{session?.email ?? "admin@comfinityindia.com"}</p>
                <p className="text-xs text-neutral-500 font-mono">Current Session User · Role: Super Admin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Active
              </span>
              <button className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded-lg px-3 py-1.5 transition">
                Manage Keys
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminModuleScaffold>
  );
}
