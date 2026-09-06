/* The magazine runs on the site's own faces — Instrument Serif for headings
   and copy, Geist Mono for the small-caps labels — so that the hand-built
   opening pages and the data-driven pages read as one book. Both families
   are already loaded by the root layout; this wrapper only carries the
   .mag-type class that maps them onto --mag-display / --mag-text /
   --mag-label for the .mag-* rules in globals.css. */
export default function MagazineLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mag-type">{children}</div>;
}
