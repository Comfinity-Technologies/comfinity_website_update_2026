import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Globe2 } from "lucide-react";
import { getCommunityData } from "@/lib/community-store";
import { CommunityClient } from "./CommunityClient";

export default function CommunityAdmin() {
  const data = getCommunityData();
  const programs = data.programs || [];
  const values = data.values || [];

  return (
    <AdminModuleScaffold
      title="Community Ecosystem"
      category="Ecosystem"
      description="Manage developer outreach, student ambassador initiatives, hackathons, and community core values."
      icon={Globe2}
      liveUrl="/community"
      stats={[
        { label: "Active Programs", value: programs.length },
        { label: "Community Values", value: `${values.length} Pillars`, subtext: "Platform ethos" },
        { label: "Storage", value: "community.json", subtext: "Live atomic store" },
        { label: "Public Status", value: "Live on /community", subtext: "Instant revalidation" },
      ]}
    >
      <CommunityClient initialPrograms={programs} initialValues={values} />
    </AdminModuleScaffold>
  );
}
