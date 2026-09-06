"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./anim/ScrollProgress";
import Preloader from "./Preloader";

export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <SmoothScroll>
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
}