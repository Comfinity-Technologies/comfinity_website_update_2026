import { Fraunces, Newsreader, Archivo } from "next/font/google";

/* The magazine sets its own editorial faces — a display serif, a text serif
   and a grotesque for the small caps labels. They are declared here rather
   than in the root layout so the rest of the site does not pay to download
   three families it never renders. Consumed by the .mag-* rules in
   globals.css via --mag-display / --mag-text / --mag-label. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export default function MagazineLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`mag-type ${fraunces.variable} ${newsreader.variable} ${archivo.variable}`}
    >
      {children}
    </div>
  );
}
