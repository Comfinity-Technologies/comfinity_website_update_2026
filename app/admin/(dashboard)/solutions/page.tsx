import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Briefcase } from "lucide-react";
import { getSolutions } from "@/lib/solutions-store";
import { SolutionsClient } from "./SolutionsClient";

export default function SolutionsAdmin() {
  const solutions = getSolutions();

  return (
    <AdminModuleScaffold
      title="Solutions"
      category="Showcase"
      description="Manage business solution lines, capability matrices, and enterprise service packages with real-time site synchronization."
      icon={Briefcase}
      liveUrl="/solutions"
      stats={[
        { label: "Active Practices", value: solutions.length },
        { label: "Total Capabilities", value: `${solutions.reduce((acc, s) => acc + (s.items?.length ?? 0), 0)} Items`, subtext: "Across verticals" },
        { label: "Storage", value: "solutions.json", subtext: "Live atomic store" },
        { label: "Public Status", value: "Live on /solutions", subtext: "Instant revalidation" },
      ]}
    >
      <SolutionsClient initialSolutions={solutions} />
    </AdminModuleScaffold>
  );
}
