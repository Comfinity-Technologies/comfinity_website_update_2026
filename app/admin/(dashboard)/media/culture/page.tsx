import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Sparkles } from "lucide-react";
import { getPhotos } from "@/lib/media-store";
import { MediaManagerClient } from "@/components/admin/MediaManagerClient";

export default function MediaCultureAdmin() {
  const photos = getPhotos("culture");

  return (
    <AdminModuleScaffold
      title="Company Culture Photos"
      category="Media"
      description="Manage photographs showcasing office environments, laboratory spaces, collaborative moments, and team culture."
      icon={Sparkles}
      stats={[
        { label: "Culture Photos", value: photos.length },
        { label: "Resolution", value: "High-DPI Ready", subtext: "Retina supported" },
        { label: "Storage Engine", value: "Cloudinary + Local", subtext: "Automated caching" },
        { label: "Public Usage", value: "/about & /careers", subtext: "Live on site" },
      ]}
    >
      <MediaManagerClient
        initialPhotos={photos}
        defaultCategory="culture"
        title="Culture Photos"
      />
    </AdminModuleScaffold>
  );
}
