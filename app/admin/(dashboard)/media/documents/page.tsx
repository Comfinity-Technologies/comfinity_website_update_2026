import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { FileText } from "lucide-react";
import { getDocuments } from "@/lib/media-store";
import { DocumentsClient } from "./DocumentsClient";

export default function MediaDocumentsAdmin() {
  const documents = getDocuments();

  return (
    <AdminModuleScaffold
      title="Documents & Whitepapers"
      category="Media"
      description="Manage enterprise whitepapers, downloadable datasheets, client RFP attachments, and corporate PDFs."
      icon={FileText}
      stats={[
        { label: "Hosted Documents", value: documents.length },
        { label: "Storage Used", value: "Cloudinary CDN", subtext: "Fast regional delivery" },
        { label: "Formats", value: "PDF & DOCX", subtext: "Client accessible" },
        { label: "Public Status", value: "Active", subtext: "Direct download links" },
      ]}
    >
      <DocumentsClient initialDocuments={documents} />
    </AdminModuleScaffold>
  );
}
