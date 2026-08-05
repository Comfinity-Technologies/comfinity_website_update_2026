import Link from "next/link";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Company Magazine", href: "/about/magazine" },
      { label: "Our Story", href: "/about/story" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "Divisions", href: "/about/divisions" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI & Software", href: "/solutions#ai" },
      { label: "Enterprise Transformation", href: "/solutions#enterprise" },
      { label: "Product Engineering", href: "/solutions#product" },
      { label: "Electronics & Hardware", href: "/solutions#hardware" },
      { label: "Data Intelligence", href: "/solutions#data" },
      { label: "Industries", href: "/solutions#industries" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Products", href: "/about/divisions" },
      { label: "Roadmap", href: "/about/divisions" },
      { label: "Coming Soon", href: "/labs" },
      { label: "Documentation", href: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Student Ambassador", href: "/community#ambassador" },
      { label: "Startup Community", href: "/community#startup" },
      { label: "Innovation Challenges", href: "/community#challenges" },
      { label: "Newsletter", href: "/community#newsletter" },
      { label: "Helping Hands", href: "/community#helping-hands" },
      { label: "Partnerships", href: "/partners" },
    ],
  },
  {
    title: "Labs",
    links: [
      { label: "Comfinity Labs", href: "/labs" },
      { label: "Submit an Idea", href: "/labs#journey" },
      { label: "Research Programs", href: "/labs#programs" },
      { label: "Fellowships", href: "/labs#programs" },
      { label: "Domains", href: "/labs#domains" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
              comfinity<span className="text-accent">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Technology &amp; Innovation Group — Building the Future Through
              Technology, Research, and Community.
            </p>
            <div className="mt-8 flex gap-3">
              {["LinkedIn", "X", "GitHub", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="section-label mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} Comfinity Technologies. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-faint">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <a href="/sitemap.xml" className="transition-colors hover:text-foreground">
              Sitemap
            </a>
            <span className="font-serif-accent text-muted">
              &ldquo;Where Ideas Become Impact.&rdquo;
            </span>
          </div>
        </div>
        <p className="mt-6 text-xs text-faint/60">
          Designed and built by Comfinity. Made with intention.
        </p>
      </div>

      {/* oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden pb-2"
      >
        <p
          data-speed="1.08"
          className="font-display whitespace-nowrap text-center text-[13vw] font-bold leading-none tracking-tight text-watermark"
        >
          COMFINITY
        </p>
      </div>
    </footer>
  );
}
