import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Briefcase } from "lucide-react";
import { readCareers, getJobOpenings } from "./_helpers";
import { CareersClient } from "./CareersClient";

export default function CareersAdminPage() {
  const data = readCareers();
  const openings = getJobOpenings();

  return (
    <AdminModuleScaffold
      title="Careers & Talent"
      category="Ecosystem"
      description="Manage active job openings, student internships, fellowship tracks, and organizational culture matrices."
      icon={Briefcase}
      liveUrl="/careers"
      stats={[
        { label: "Active Roles", value: openings.filter((j) => j.status === "Active").length },
        { label: "Total Openings", value: openings.length, subtext: "Across departments" },
        { label: "Student Tracks", value: data.studentPrograms.length, subtext: "Internships & ambassador" },
        { label: "Public Status", value: "Live on /careers", subtext: "Instant revalidation" },
      ]}
    >
      <CareersClient initialData={data} initialOpenings={openings} />
    </AdminModuleScaffold>
  );
}