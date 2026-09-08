import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import { readSubmissions } from "./contacts/_helpers";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

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
      {/* Dynamic Client-Side Admin Sidebar */}
      <AdminSidebar session={session} unreadCount={unreadCount} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#0c0c0c]">{children}</main>
    </div>
  );
}