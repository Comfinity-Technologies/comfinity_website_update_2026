import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Image as ImageIcon } from "lucide-react";
import { getPhotos } from "@/lib/media-store";
import { MediaManagerClient } from "@/components/admin/MediaManagerClient";

export default function MediaPhotosAdmin() {
  const photos = getPhotos("photos");

  return (
    <AdminModuleScaffold
      title="Brand & Product Photos"
      category="Media"
      description="Manage brand photography, product assets, and CDN-optimized high-resolution imagery."
      icon={ImageIcon}
      stats={[
        { label: "Total Assets", value: photos.length },
        { label: "Storage Engine", value: "Cloudinary + Local", subtext: "Automatic fallback" },
        { label: "Optimizations", value: "WebP / AVIF", subtext: "Automated scaling" },
        { label: "Public Status", value: "CDN Active", subtext: "Instant sync" },
      ]}
    >
      <MediaManagerClient
        initialPhotos={photos}
        defaultCategory="photos"
        title="Photos"
      />
    </AdminModuleScaffold>
  );
}
