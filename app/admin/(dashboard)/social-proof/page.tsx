import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { client: "Enterprise Retail Group", author: "Chief Technology Officer", quote: "Comfinity reduced our data ingestion latency by 82% within the first month.", rating: "5.0" },
  { client: "FinTech Scaleup", author: "Head of Infrastructure", quote: "The hardware and AI integration delivered beyond our compliance benchmarks.", rating: "5.0" },
  { client: "Global Logistics Network", author: "VP of Digital Engineering", quote: "Reliable, responsive, and technically exceptional execution.", rating: "5.0" },
];

export default function SocialProofAdmin() {
  return (
    <AdminModuleScaffold
      title="Social Proof"
      category="Showcase"
      description="Manage enterprise testimonials, client quotes, trust badges, industry awards, and key metric callouts."
      icon={Star}
      liveUrl="/"
      stats={[
        { label: "Client Testimonials", value: "12", subtext: "Verified endorsements" },
        { label: "Average Rating", value: "4.9 / 5.0", subtext: "Across 28+ projects" },
        { label: "Awards & Honors", value: "4", subtext: "2024-2026 recognized" },
        { label: "Active on Homepage", value: "6 items", subtext: "Marquee carousel" },
      ]}
    >
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Featured Endorsements</h3>
          <span className="text-xs text-neutral-500 font-mono">Live on site</span>
        </div>
        <div className="divide-y divide-neutral-800/60">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="px-5 py-4 space-y-1 hover:bg-neutral-800/30 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{t.client}</span>
                  <span className="text-xs text-neutral-500 font-mono">· {t.author}</span>
                </div>
                <span className="text-xs font-mono text-amber-400">★ {t.rating}</span>
              </div>
              <p className="text-xs text-neutral-400 italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </AdminModuleScaffold>
  );
}
