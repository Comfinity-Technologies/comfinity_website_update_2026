import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { MessageSquareQuote } from "lucide-react";
import { getTestimonials } from "@/lib/testimonials-store";
import { TestimonialsClient } from "./TestimonialsClient";

export default function TestimonialsAdmin() {
  const testimonials = getTestimonials();

  return (
    <AdminModuleScaffold
      title="Client Testimonials"
      category="Social Proof"
      description="Manage verified executive endorsements and client reviews featured across the live Comfinity homepage."
      icon={MessageSquareQuote}
      liveUrl="/#testimonials"
      stats={[
        { label: "Active Testimonials", value: testimonials.length },
        { label: "Featured on Homepage", value: `${testimonials.filter((t) => t.featured).length} Reviews`, subtext: "Homepage stream" },
        { label: "Storage", value: "testimonials.json", subtext: "Live atomic store" },
        { label: "Sync Status", value: "Instant", subtext: "Revalidates on save" },
      ]}
    >
      <TestimonialsClient initialTestimonials={testimonials} />
    </AdminModuleScaffold>
  );
}
