"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer, { type FooterSettings } from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./anim/ScrollProgress";
import Preloader from "./Preloader";

export default function PublicChrome({
  children,
  globalSettings,
}: {
  children: React.ReactNode;
  globalSettings?: FooterSettings;
}) {
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
        <Footer settings={globalSettings} />
      </SmoothScroll>
    </>
  );
}