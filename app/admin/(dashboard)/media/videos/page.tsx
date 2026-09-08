import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Video } from "lucide-react";
import { getVideos } from "@/lib/media-store";
import { VideosClient } from "./VideosClient";

export default function MediaVideosAdmin() {
  const videos = getVideos();

  return (
    <AdminModuleScaffold
      title="Video Showcase & Streams"
      category="Media"
      description="Manage video reels, product walkthrough clips, webinar recordings, and CDN hosted video streams."
      icon={Video}
      stats={[
        { label: "Active Streams", value: videos.length },
        { label: "Showcase Formats", value: "YouTube / Vimeo / MP4", subtext: "Multi-embed support" },
        { label: "Bitrate", value: "Adaptive HD/4K", subtext: "Player optimized" },
        { label: "Public Status", value: "Streaming live", subtext: "Global embed" },
      ]}
    >
      <VideosClient initialVideos={videos} />
    </AdminModuleScaffold>
  );
}
