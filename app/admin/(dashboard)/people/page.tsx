import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Users } from "lucide-react";
import { getLeadership } from "@/lib/team-store";
import { PeopleClient } from "./PeopleClient";

export default function PeopleAdmin() {
  const leaders = getLeadership();

  return (
    <AdminModuleScaffold
      title="People & Leadership"
      category="Showcase"
      description="Manage executive leadership profiles, 1-click portrait photo replacement, and organizational hierarchy."
      icon={Users}
      liveUrl="/about/leadership"
      stats={[
        { label: "Executive Leadership", value: `${leaders.length} Profiles`, subtext: "Live on /about/leadership" },
        { label: "Portraits Uploaded", value: `${leaders.filter((l) => Boolean(l.portraitUrl)).length} / ${leaders.length}`, subtext: "Photo status" },
        { label: "Storage", value: "team.json", subtext: "Live atomic store" },
        { label: "Advisory Board", value: "Active", subtext: "Synced with /about" },
      ]}
    >
      <PeopleClient initialLeaders={leaders} />
    </AdminModuleScaffold>
  );
}
