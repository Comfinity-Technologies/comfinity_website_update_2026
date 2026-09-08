import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Star } from "lucide-react";
import { getGoogleReviews } from "@/lib/google-reviews-store";
import { GoogleReviewsClient } from "./GoogleReviewsClient";

export default function GoogleReviewsAdmin() {
  const reviews = getGoogleReviews();
  const publishedCount = reviews.filter((r) => r.status === "Published").length;
  const pendingCount = reviews.filter((r) => r.status === "Pending Approval").length;

  return (
    <AdminModuleScaffold
      title="Google Reviews"
      category="Social Proof"
      description="Manage verified Google Business Profile ratings with an import and moderation approval pipeline."
      icon={Star}
      liveUrl="/"
      stats={[
        { label: "Aggregate Rating", value: "4.8 ★", subtext: "126 Verified Reviews" },
        { label: "Moderation Queue", value: `${publishedCount} Published`, subtext: `${pendingCount} Pending` },
        { label: "Storage", value: "google-reviews.json", subtext: "Live atomic store" },
        { label: "Google Sync", value: "Active", subtext: "Daily webhook check" },
      ]}
    >
      <GoogleReviewsClient initialReviews={reviews} />
    </AdminModuleScaffold>
  );
}
