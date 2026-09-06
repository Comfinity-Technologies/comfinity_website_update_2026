import type { Metadata } from "next";
import WorksClient from "./WorksClient";
import { getProjects } from "@/app/admin/(dashboard)/projects/_helpers";

export const metadata: Metadata = {
  title: "Our Works & Case Studies | Comfinity Technologies",
  description:
    "Explore Comfinity's portfolio of enterprise software, AI automation, streaming platforms, IoT hardware, and digital products engineered for high-impact clients worldwide.",
};

export default function WorksPage() {
  const projects = getProjects();
  return <WorksClient initialProjects={projects} />;
}
