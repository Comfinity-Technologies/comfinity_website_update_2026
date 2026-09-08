import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { FlaskConical } from "lucide-react";
import { getLabsData } from "@/lib/labs-store";
import { LabsClient } from "./LabsClient";

export default function LabsAdmin() {
  const data = getLabsData();
  const initiatives = data.initiatives || [];
  const programs = data.programs || [];
  const domains = data.domains || [];

  return (
    <AdminModuleScaffold
      title="Comfinity Labs"
      category="Ecosystem"
      description="Manage frontier research initiatives, hardware prototypes, fellowship tracks, and technology domains."
      icon={FlaskConical}
      liveUrl="/labs"
      stats={[
        { label: "Active Experiments", value: initiatives.length },
        { label: "Labs Programs", value: programs.length, subtext: "Fellowships & tracks" },
        { label: "Tech Domains", value: domains.length, subtext: "In ticker" },
        { label: "Public Status", value: "Live on /labs", subtext: "Instant revalidation" },
      ]}
    >
      <LabsClient
        initialInitiatives={initiatives}
        initialPrograms={programs}
        initialDomains={domains}
      />
    </AdminModuleScaffold>
  );
}
