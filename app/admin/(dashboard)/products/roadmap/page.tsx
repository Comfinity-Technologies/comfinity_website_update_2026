import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { GitPullRequest } from "lucide-react";
import { getRoadmapItems } from "@/lib/products-store";
import { RoadmapClient } from "./RoadmapClient";

export default function ProductRoadmapAdmin() {
  const items = getRoadmapItems();
  const releasedCount = items.filter((i) => i.status === "Released").length;
  const inDevCount = items.filter((i) => i.status === "In Development" || i.status === "Testing").length;

  return (
    <AdminModuleScaffold
      title="Product Roadmap"
      category="Products"
      description="Track feature delivery milestones across quarters for Drishti, AppGenie, Nexzo, and REPZ."
      icon={GitPullRequest}
      stats={[
        { label: "Total Milestones", value: items.length },
        { label: "Active Pipeline", value: `${inDevCount} in progress`, subtext: "Dev & Testing" },
        { label: "Shipped Features", value: `${releasedCount} Released`, subtext: "Live on edge" },
        { label: "Storage", value: "roadmap.json", subtext: "Live atomic store" },
      ]}
    >
      <RoadmapClient initialItems={items} />
    </AdminModuleScaffold>
  );
}
