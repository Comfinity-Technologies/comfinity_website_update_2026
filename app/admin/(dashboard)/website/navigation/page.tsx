import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Menu } from "lucide-react";

export default function WebsiteNavigationAdmin() {
  return (
    <AdminModuleScaffold
      title="Navigation"
      category="Website"
      description="Manage main navbar links, footer columns, mobile navigation drawer, and action buttons."
      icon={Menu}
      liveUrl="/"
      stats={[
        { label: "Header Links", value: "6 items", subtext: "Primary nav" },
        { label: "Footer Menus", value: "4 columns", subtext: "18 links total" },
        { label: "CTA Button", value: "Contact Us", subtext: "Directs to /contact" },
        { label: "Mobile Drawer", value: "Synchronized", subtext: "Automatic" },
      ]}
    >
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">Header Menu Hierarchy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {["About", "Solutions", "Works", "Labs", "Careers", "Contact"].map((item, idx) => (
            <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/40 border border-neutral-800">
              <span className="text-neutral-300">{idx + 1}. {item}</span>
              <span className="text-[10px] font-mono text-neutral-500">Order #{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminModuleScaffold>
  );
}
