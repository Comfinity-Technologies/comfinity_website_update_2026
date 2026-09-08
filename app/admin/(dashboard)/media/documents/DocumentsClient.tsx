"use client";

import { useState } from "react";
import { Plus, Trash2, FileText, Download, ExternalLink } from "lucide-react";
import { DocumentItem } from "@/lib/media-store";
import { saveDocumentAction, deleteDocumentAction } from "../_actions";

interface DocumentsClientProps {
  initialDocuments: DocumentItem[];
}

export function DocumentsClient({ initialDocuments }: DocumentsClientProps) {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Document &amp; Whitepaper Repository</h3>
          <p className="text-xs text-neutral-500">Corporate brochures, RFP attachments, and research whitepapers</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Document
        </button>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        {documents.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-xs text-neutral-400">No documents uploaded yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/60">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="px-5 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{doc.title}</h4>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      {doc.type.toUpperCase()} · {doc.size || "1.0 MB"} · Uploaded{" "}
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View / Download</span>
                  </a>
                  <button
                    onClick={async () => {
                      if (confirm(`Remove document "${doc.title}"?`)) {
                        await deleteDocumentAction(doc.id);
                        setDocuments(documents.filter((d) => d.id !== doc.id));
                      }
                    }}
                    className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: ADD DOCUMENT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">Add Document Asset</h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await saveDocumentAction(formData);
                  const newDoc: DocumentItem = {
                    id: (formData.get("id") as string) || `doc-${Date.now()}`,
                    title: (formData.get("title") as string) || "Untitled Document",
                    url: (formData.get("url") as string) || "",
                    type: (formData.get("type") as "pdf" | "doc") || "pdf",
                    size: (formData.get("size") as string) || "1.0 MB",
                    uploadedAt: new Date().toISOString(),
                  };
                  setDocuments([newDoc, ...documents]);
                  setModalOpen(false);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-neutral-400 mb-1">Document Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Comfinity 2026 Corporate Brochure.pdf"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Document URL *</label>
                <input
                  type="text"
                  name="url"
                  required
                  placeholder="/docs/... or https://..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Document Type</label>
                  <select
                    name="type"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="doc">Word Document (.docx)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">File Size</label>
                  <input
                    type="text"
                    name="size"
                    placeholder="e.g. 2.4 MB"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Add Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
