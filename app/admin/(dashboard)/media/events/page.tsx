import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Calendar } from "lucide-react";
import { getPhotos } from "@/lib/media-store";
import { MediaManagerClient } from "@/components/admin/MediaManagerClient";

export default function MediaEventsAdmin() {
  const photos = getPhotos("events");

  return (
    <AdminModuleScaffold
      title="Event & Summit Photos"
      category="Media"
      description="Manage photographs from conferences, hackathons, university seminars, and ASEAN tech summits."
      icon={Calendar}
      stats={[
        { label: "Event Photos", value: photos.length },
        { label: "Summits Covered", value: "ASEAN 2026", subtext: "Regional summits" },
        { label: "Storage Engine", value: "Cloudinary + Local", subtext: "Fast global CDN" },
        { label: "Public Status", value: "Live sync", subtext: "Automatic preview" },
      ]}
    >
      <MediaManagerClient
        initialPhotos={photos}
        defaultCategory="events"
        title="Event Photos"
      />
    </AdminModuleScaffold>
  );
}
