import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import PublicChrome from "./_components/PublicChrome";
import { getGlobalSettings } from "@/lib/global-store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  const globalSettings = getGlobalSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.dataset.theme="light"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full font-sans antialiased">
        <PublicChrome globalSettings={globalSettings}>{children}</PublicChrome>
      </body>
    </html>
  );
}
