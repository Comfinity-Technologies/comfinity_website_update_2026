import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import { logoutAdmin } from "@/app/actions/admin-auth";
import { readSubmissions } from "./contacts/_helpers";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/contacts", label: "Inbox & Alerts", icon: "✉" },
  { href: "/admin/projects", label: "Projects", icon: "◻" },
  { href: "/admin/magazine", label: "Magazine", icon: "◈" },
  { href: "/admin/careers", label: "Careers", icon: "◎" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const submissions = readSubmissions();
  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div className="flex h-screen bg-[#0c0c0c] text-white font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col bg-[#111111] border-r border-neutral-800">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-0.5">
              Comfinity
            </p>
            <p className="text-sm font-semibold text-white">Admin Panel</p>
          </div>
          {unreadCount > 0 && (
            <span
              title={`${unreadCount} unread alert${unreadCount === 1 ? "" : "s"}`}
              className="flex h-2 w-2 relative"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV_LINKS.map((link) => {
            const isInbox = link.href === "/admin/contacts";
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base leading-none text-neutral-500 group-hover:text-white transition-colors">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>

                {isInbox && unreadCount > 0 && (
                  <span className="text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-neutral-800">
          <p className="text-[10px] text-neutral-600 truncate mb-2">
            {session.email}
          </p>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="w-full text-left text-xs text-neutral-500 hover:text-red-400 transition-colors py-1"
            >
              Sign out →
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}