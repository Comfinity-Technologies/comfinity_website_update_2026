import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Handshake } from "lucide-react";
import { getPartnersData } from "@/lib/partners-store";
import { PartnersClient } from "./PartnersClient";

export default function PartnersAdmin() {
  const data = getPartnersData();
  const partners = data.partners || [];
  const types = data.types || [];
  const sponsorships = data.sponsorships || [];

  return (
    <AdminModuleScaffold
      title="Partners & Alliances"
      category="Showcase"
      description="Manage technology alliances, hardware integrations, academic collaborations, and sponsor packages."
      icon={Handshake}
      liveUrl="/partners"
      stats={[
        { label: "Active Partners", value: partners.length },
        { label: "Partnership Types", value: types.length, subtext: "Framework models" },
        { label: "Sponsorships", value: sponsorships.length, subtext: "Available packages" },
        { label: "Public Status", value: "Live on /partners", subtext: "Instant revalidation" },
      ]}
    >
      <PartnersClient
        initialPartners={partners}
        initialTypes={types}
        initialSponsorships={sponsorships}
      />
    </AdminModuleScaffold>
  );
}
