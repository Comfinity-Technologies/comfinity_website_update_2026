import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Building2 } from "lucide-react";
import { getIndustries } from "@/lib/solutions-store";
import { IndustriesClient } from "./IndustriesClient";

export default function IndustriesAdmin() {
  const industries = getIndustries();

  return (
    <AdminModuleScaffold
      title="Industries"
      category="Solutions"
      description="Manage target industry verticals, domain-specific capabilities, and associated client case studies."
      icon={Building2}
      liveUrl="/solutions#industries"
      stats={[
        { label: "Configured Sectors", value: industries.length },
        { label: "Active Deployments", value: "25+ Sites", subtext: "Cross-industry" },
        { label: "Storage", value: "industries.json", subtext: "Live atomic store" },
        { label: "Public Status", value: "Live on /solutions", subtext: "Instant revalidation" },
      ]}
    >
      <IndustriesClient initialIndustries={industries} />
    </AdminModuleScaffold>
  );
}
