import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import SmoothScroll from "./_components/SmoothScroll";
import ScrollProgress from "./_components/anim/ScrollProgress";
import Preloader from "./_components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Comfinity Technologies | Technology & Innovation Group",
    template: "%s | Comfinity Technologies",
  },
  description:
    "Comfinity is a global technology & innovation group engineering intelligent products, enterprise solutions, research ecosystems, and communities that create real-world impact across Southeast Asia and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${instrument.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.dataset.theme="light"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full">
        <Preloader />
        <ScrollProgress />
        <Navbar />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
