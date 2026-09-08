import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Sliders } from "lucide-react";
import { getGlobalSettings } from "@/lib/global-store";
import { GlobalSettingsClient } from "./GlobalSettingsClient";

export default function WebsiteGlobalAdmin() {
  const settings = getGlobalSettings();

  return (
    <AdminModuleScaffold
      title="Global Website Settings"
      category="Website"
      description="Manage sitewide constants, announcement banners, social media handles, and footer legal disclosures."
      icon={Sliders}
      liveUrl="/"
      stats={[
        {
          label: "Announcement",
          value: settings.announcement?.enabled ? "Active" : "Disabled",
          subtext: settings.announcement?.badge || "Header badge",
        },
        {
          label: "Social Channels",
          value: `${Object.values(settings.social || {}).filter(Boolean).length} Active`,
          subtext: "LinkedIn, X, GitHub...",
        },
        { label: "Contact Email", value: settings.contact?.email || "Connected", subtext: "Sitewide email" },
        { label: "Public Status", value: "Live Synced", subtext: "Instant revalidation" },
      ]}
    >
      <GlobalSettingsClient initialSettings={settings} />
    </AdminModuleScaffold>
  );
}
