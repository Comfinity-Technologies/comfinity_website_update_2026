import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Layers } from "lucide-react";
import { getHomepageSections } from "@/lib/homepage-store";
import { HomepageClient } from "./HomepageClient";

export default function WebsiteHomepageAdmin() {
  const data = getHomepageSections();

  return (
    <AdminModuleScaffold
      title="Homepage CMS"
      category="Website"
      description="Section-based editing for hero slides sequence, company statistics band, and summit announcements."
      icon={Layers}
      liveUrl="/"
      stats={[
        { label: "Hero Sequence", value: `${data.hero.length} Slides`, subtext: "GSAP motion enabled" },
        { label: "Company Stats", value: `${data.stats.length} Metrics`, subtext: "Counter animation band" },
        { label: "Announcement", value: data.announcement.enabled ? "Active" : "Disabled", subtext: data.announcement.label || "Summit news" },
        { label: "Storage", value: "homepage-sections.json", subtext: "Live atomic store" },
      ]}
    >
      <HomepageClient initialData={data} />
    </AdminModuleScaffold>
  );
}
