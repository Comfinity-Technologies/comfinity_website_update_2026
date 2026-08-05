/**
 * Comfinity Product Magazine 2026 — content model.
 *
 * Source: "Magazine and presentation for Company product 2026".
 * Sequenced into 22 pages / 11 leaves so every opening lands as a designed
 * spread (see SPREADS below). Keep the count even — the flipbook pairs
 * page 2i / 2i+1 onto the front and back of leaf i.
 *
 * Items marked `pending: true` are layout placeholders: the source doc calls
 * for the section but does not supply the copy yet.
 */

/** Full-bleed art behind a page. Text sits over a scrim, so keep the
 *  focal point away from the lower two-thirds where copy lands. */
export type PageImage = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center top" */
  position?: string;
  /** `contain` for illustrations/SVGs that must not be cropped */
  fit?: "cover" | "contain";
  /** >1 crops inward — used to isolate the cover face out of a mockup render */
  zoom?: number;
};

export type Block =
  | { type: "eyebrow"; text: string }
  | { type: "title"; text: string; accent?: string }
  | { type: "lede"; text: string }
  | { type: "para"; text: string }
  | { type: "quote"; text: string; by?: string }
  | { type: "rule" }
  | { type: "rating"; stars: number }
  | { type: "link"; href: string; label: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: { n: string; title: string; body: string }[] }
  | { type: "iconList"; items: { icon: string; title: string; body: string }[] }
  | {
      type: "cards";
      items: { title: string; body: string; thumb?: PageImage }[];
    }
  | { type: "stats"; items: { value: string; label: string; pending?: boolean }[] }
  | { type: "tags"; items: string[] }
  | {
      type: "contents";
      items: { n: string; label: string; page: number }[];
    }
  | {
      type: "reviews";
      items: { name: string; org: string; quote: string; avatar?: string; pending?: boolean }[];
    };

export type Variant =
  | "cover"
  | "backCover"
  | "divider"
  | "editorial"
  | "contents"
  | "product";

export type MagazinePage = {
  /** 1-based printed folio; null on cover/divider pages that carry no number */
  folio: number | null;
  variant: Variant;
  /** running header shown on editorial pages */
  section?: string;
  /** full-bleed art; the page switches to light-on-dark when present */
  image?: PageImage;
  blocks: Block[];
};

export const MAGAZINE_TITLE = "Comfinity Technologies";
export const MAGAZINE_EDITION = "Product Magazine — 2026 Edition";
/** Running foot printed on every page, opposite the folio. */
export const MAGAZINE_SITE = "comfinityindia.com";

export const magazinePages: MagazinePage[] = [
  /* ---------------------------------------------------------------- 1 cover */
  {
    folio: null,
    variant: "cover",
    // cover.png is a mockup render of a magazine standing in a scene; the
    // zoom crops in to the cover face itself. The artwork carries its own
    // complete typography, so the page adds no overlay copy.
    image: {
      src: "/magazine/cover.png",
      alt: "Comfinity Technologies 2026 product magazine cover",
      position: "center center",
      zoom: 1.22,
    },
    blocks: [],
  },

  /* ------------------------------------------------------------- 2 contents */
  {
    folio: 2,
    variant: "contents",
    section: "Contents",
    blocks: [
      { type: "eyebrow", text: "Inside This Edition" },
      { type: "title", text: "Contents" },
      {
        type: "contents",
        items: [
          { n: "01", label: "About Us", page: 3 },
          { n: "02", label: "Mission & Vision", page: 4 },
          { n: "03", label: "Core Values", page: 6 },
          { n: "04", label: "The Comfinity Difference", page: 8 },
          { n: "05", label: "Our Expertise", page: 9 },
          { n: "06", label: "Solutions & Industries", page: 10 },
          { n: "07", label: "Case Studies", page: 11 },
          { n: "08", label: "Client Reviews", page: 12 },
          { n: "09", label: "Products & Portfolio", page: 13 },
          { n: "10", label: "Live Innovations", page: 19 },
          { n: "11", label: "Research & Development", page: 20 },
          { n: "12", label: "Let's Build Together", page: 21 },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- 3 about */
  {
    folio: 3,
    variant: "editorial",
    section: "About Us",
    blocks: [
      { type: "eyebrow", text: "01 — About Us" },
      {
        type: "title",
        text: "Complexity into",
        accent: "clarity.",
      },
      {
        type: "lede",
        text: "Comfinity Technologies is an Innovation & Technology Partner dedicated to helping organizations transform complexity into clarity and ideas into measurable impact.",
      },
      { type: "rule" },
      {
        type: "para",
        text: "We believe technology should solve real business challenges, not create new ones. Every solution we build begins with understanding our clients, their goals, and the challenges they face.",
      },
      {
        type: "para",
        text: "From AI-powered automation and custom software to digital platforms and enterprise solutions, we combine strategic thinking with engineering excellence to create solutions that drive sustainable growth.",
      },
      {
        type: "para",
        text: "More than a technology provider, we become a long-term partner — working alongside businesses to innovate, adapt, and grow in an ever-evolving digital world.",
      },
    ],
  },

  /* -------------------------------------------------------------- 4 mission */
  {
    folio: 4,
    variant: "editorial",
    section: "Mission",
    blocks: [
      { type: "eyebrow", text: "02 — Our Mission" },
      { type: "title", text: "What we", accent: "commit to." },
      {
        type: "iconList",
        items: [
          {
            icon: "🎯",
            title: "Understand Before We Build",
            body: "We begin every engagement by understanding our clients' business, challenges, and goals to deliver solutions that create lasting value.",
          },
          {
            icon: "🚀",
            title: "Drive Meaningful Innovation",
            body: "We leverage emerging technologies, intelligent automation, and strategic thinking to solve real business problems and accelerate digital transformation.",
          },
          {
            icon: "🤝",
            title: "Build Long-Term Partnerships",
            body: "We are committed to becoming trusted technology partners, supporting organizations throughout their journey of innovation, growth, and continuous improvement.",
          },
        ],
      },
    ],
  },

  /* --------------------------------------------------------------- 5 vision */
  {
    folio: 5,
    variant: "editorial",
    section: "Vision",
    blocks: [
      { type: "eyebrow", text: "02 — Our Vision" },
      { type: "title", text: "Where we are", accent: "going." },
      {
        type: "iconList",
        items: [
          {
            icon: "🌍",
            title: "Transform Challenges into Intelligence",
            body: "Helping organizations simplify challenges through intelligent, scalable technology.",
          },
          {
            icon: "💡",
            title: "Turn Ideas into Impact",
            body: "Empowering businesses to transform bold ideas into meaningful, measurable outcomes.",
          },
          {
            icon: "🌱",
            title: "Build the Future Together",
            body: "Creating lasting partnerships that inspire innovation, sustainable growth, and shared success.",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- 6 values 1–3 */
  {
    folio: 6,
    variant: "editorial",
    section: "Core Values",
    blocks: [
      { type: "eyebrow", text: "03 — Core Values" },
      { type: "title", text: "What we", accent: "stand on." },
      {
        type: "numbered",
        items: [
          {
            n: "01",
            title: "Business First",
            body: "We understand the business before recommending technology.",
          },
          {
            n: "02",
            title: "Innovation with Purpose",
            body: "Every solution we create is designed to solve meaningful problems and deliver measurable value.",
          },
          {
            n: "03",
            title: "Partnership & Trust",
            body: "We believe lasting relationships are built through transparency, collaboration, and shared success.",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- 7 values 4–6 */
  {
    folio: 7,
    variant: "editorial",
    section: "Core Values",
    blocks: [
      { type: "eyebrow", text: "03 — Core Values" },
      { type: "title", text: "Continued." },
      {
        type: "numbered",
        items: [
          {
            n: "04",
            title: "Excellence in Execution",
            body: "We combine strategic thinking with engineering excellence to deliver solutions that are reliable, scalable, and future-ready.",
          },
          {
            n: "05",
            title: "Continuous Learning",
            body: "Technology evolves every day. We embrace curiosity, learning, and improvement to stay ahead and help our clients do the same.",
          },
          {
            n: "06",
            title: "Integrity",
            body: "We communicate honestly, challenge assumptions when necessary, and always act in the best interest of our clients and partners.",
          },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------- 8 difference */
  {
    folio: 8,
    variant: "editorial",
    section: "Why Us",
    blocks: [
      { type: "eyebrow", text: "04 — Why Us" },
      { type: "title", text: "The Comfinity", accent: "difference." },
      {
        type: "quote",
        text: "We understand the business before we recommend the technology.",
      },
      {
        type: "para",
        text: "Most technology partners start with a stack. We start with a question: what is actually in the way? That single reversal is why our solutions get adopted instead of shelved.",
      },
      {
        type: "cards",
        items: [
          {
            title: "Strategy before stack",
            body: "The architecture follows the business case — never the other way around.",
          },
          {
            title: "Built to be handed over",
            body: "Documented, maintainable systems your team can own and extend.",
          },
          {
            title: "Measured in outcomes",
            body: "Every engagement is tied to a number the business already cares about.",
          },
          {
            title: "Partners, not vendors",
            body: "We stay past launch — through iteration, scale, and what comes next.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ 9 expertise */
  {
    folio: 9,
    variant: "editorial",
    section: "Expertise",
    blocks: [
      { type: "eyebrow", text: "05 — Our Expertise" },
      { type: "title", text: "Four capability", accent: "pillars." },
      {
        type: "iconList",
        items: [
          {
            icon: "🧭",
            title: "Business Strategy & Transformation",
            body: "Operating-model design, digital roadmaps, and transformation programmes grounded in commercial reality.",
          },
          {
            icon: "⚙️",
            title: "Digital Engineering & Product Development",
            body: "Custom software, digital platforms, and enterprise systems engineered to scale and to be maintained.",
          },
          {
            icon: "🧠",
            title: "AI, Automation & Intelligent Systems",
            body: "AI-powered automation, machine learning, and intelligent workflows applied to real operational bottlenecks.",
          },
          {
            icon: "🌱",
            title: "Innovation, Research & Talent Development",
            body: "Applied R&D and capability building that leaves clients stronger than we found them.",
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------- 10 solutions + sectors */
  {
    folio: 10,
    variant: "editorial",
    section: "Solutions",
    blocks: [
      { type: "eyebrow", text: "06 — Solutions & Industries" },
      { type: "title", text: "What we deliver,", accent: "and for whom." },
      { type: "eyebrow", text: "Solutions We Deliver" },
      {
        type: "bullets",
        items: [
          "AI-powered automation & intelligent workflow systems",
          "Custom software & digital product engineering",
          "Enterprise platforms, ERP and B2B commerce",
          "Data analytics, dashboards & decision intelligence",
          "Cloud, edge and platform modernisation",
        ],
      },
      { type: "rule" },
      { type: "eyebrow", text: "Industries We Empower" },
      {
        type: "tags",
        items: [
          "Healthcare",
          "Education",
          "Retail",
          "Manufacturing",
          "Logistics",
          "Finance",
          "Real Estate",
        ],
      },
    ],
  },

  /* --------------------------------------------------------- 11 case studies */
  {
    folio: 11,
    variant: "editorial",
    section: "Case Studies",
    blocks: [
      { type: "eyebrow", text: "07 — Case Studies" },
      { type: "title", text: "The work,", accent: "in numbers." },
      {
        type: "stats",
        items: [
          { value: "—", label: "Platforms shipped to production", pending: true },
          { value: "—", label: "Paying business customers served", pending: true },
          { value: "—", label: "Avg. operational time saved", pending: true },
          { value: "—", label: "Industries actively served", pending: true },
        ],
      },
      {
        type: "para",
        text: "Detailed engagement breakdowns — challenge, approach, architecture and measured outcome — for each flagship platform.",
      },
      { type: "link", href: "/works", label: "Read the full case studies" },
    ],
  },

  /* -------------------------------------------------------------- 12 reviews */
  {
    folio: 12,
    variant: "editorial",
    section: "Client Reviews",
    blocks: [
      { type: "eyebrow", text: "08 — Client Reviews" },
      { type: "title", text: "In their", accent: "words." },
      {
        type: "reviews",
        items: [
          {
            name: "Aravind R",
            org: "Repz Platform",
            avatar: "/magazine/aravind_avatar.png",
            quote: "Comfinity rebuilt our campaign workflows with intelligent automation. Execution speed improved 3x seamlessly.",
            pending: false,
          },
          {
            name: "Vignesh G",
            org: "Hyperlocal Partner",
            avatar: "/magazine/vignesh_avatar.png",
            quote: "Strategic, reliable, and deeply committed. They really listened and solved our core operational bottlenecks.",
            pending: false,
          },
          {
            name: "Minute Bazaar",
            org: "Retail Commerce",
            avatar: "/magazine/minute_bazaar_avatar.png",
            quote: "Digitized our storefront network with real-time inventory and 15-minute quick delivery dispatch engine.",
            pending: false,
          },
          {
            name: "Aswathy",
            org: "Medicharm Pharma",
            avatar: "/magazine/aswathy_avatar.png",
            quote: "The pharma management system gave us complete batch inventory visibility and multi-branch sync.",
            pending: false,
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------- 13 products divider */
  {
    // carries a folio so the contents page can jump here; the number itself
    // is hidden on divider pages (see .mag-page--divider .mag-folio)
    folio: 13,
    variant: "divider",
    section: "Portfolio",
    blocks: [
      { type: "eyebrow", text: "09 — Products & Portfolio" },
      { type: "title", text: "Things we have", accent: "built so far." },
      {
        type: "lede",
        text: "Six platforms in production across commerce, streaming, marketing, hospitality and pharma.",
      },
    ],
  },

  /* -------------------------------------------------------- 14 minute bazaar */
  {
    folio: 14,
    variant: "product",
    section: "Products",
    image: {
      src: "/magazine/minute_bazaar.png",
      alt: "Minute Bazaar hyperlocal commerce app on a phone",
      position: "center top",
    },
    blocks: [
      { type: "eyebrow", text: "a) Minute Bazaar" },
      { type: "title", text: "Minute Bazaar", accent: "Hyperlocal Commerce" },
      { type: "rating", stars: 5 },
      {
        type: "para",
        text: "Comfinity's flagship hyperlocal commerce platform that empowers local retailers, supermarkets, and distributors to digitize their businesses. It provides an online storefront, order management, customer engagement tools, and hyperlocal delivery capabilities — enabling businesses to increase sales while delivering a seamless shopping experience.",
      },
      { type: "eyebrow", text: "Business Value" },
      {
        type: "bullets",
        items: [
          "Digital storefront for retailers",
          "Online order management",
          "Hyperlocal delivery ecosystem",
          "Customer retention through offers and notifications",
          "Sales analytics and business insights",
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- 15 fliqket */
  {
    folio: 15,
    variant: "product",
    section: "Products",
    image: {
      src: "/works/fliqket-ott.png",
      alt: "Fliqket OTT streaming platform interface",
      position: "center top",
    },
    blocks: [
      { type: "eyebrow", text: "b) Fliqket" },
      { type: "title", text: "Fliqket", accent: "Creator-First OTT" },
      { type: "rating", stars: 5 },
      {
        type: "para",
        text: "A creator OTT platform designed to empower filmmakers, production houses, and content creators to launch, manage, and monetize their own streaming ecosystem. With flexible monetization models, secure content delivery, and enterprise-grade management tools, Fliqket enables organizations to build sustainable digital entertainment and knowledge businesses.",
      },
      { type: "eyebrow", text: "Business Value" },
      {
        type: "bullets",
        items: [
          "Creator-first OTT with flexible monetization (SVOD, TVOD & PPV)",
          "Secure video streaming with enterprise-grade content protection",
          "Comprehensive content, user, and subscription management",
          "Real-time analytics for audience engagement and revenue",
          "Scalable multi-tenant platform for businesses and media organizations",
        ],
      },
    ],
  },

  /* ----------------------------------------------------------------- 16 repz */
  {
    folio: 16,
    variant: "product",
    section: "Products",
    image: {
      src: "/products/repz.svg",
      alt: "Repz influencer campaign management interface",
      fit: "contain",
      position: "center top",
    },
    blocks: [
      { type: "eyebrow", text: "c) Repz" },
      { type: "title", text: "Repz", accent: "Influencer & Brand" },
      { type: "rating", stars: 5 },
      {
        type: "para",
        text: "An intelligent influencer collaboration platform designed to connect brands with content creators through a streamlined campaign management ecosystem. It simplifies influencer discovery, campaign execution, communication, and performance tracking — enabling brands to build authentic partnerships and measurable marketing outcomes.",
      },
      { type: "eyebrow", text: "Business Value" },
      {
        type: "bullets",
        items: [
          "End-to-end influencer campaign management",
          "Brand & creator collaboration platform",
          "Performance tracking & campaign insights",
          "Simplified creator engagement & workflow automation",
        ],
      },
    ],
  },

  /* --------------------------------------------------------------- 17 reztos */
  {
    folio: 17,
    variant: "product",
    section: "Products",
    image: {
      src: "/magazine/reztos.png",
      alt: "Reztos restaurant operating system on a tablet",
      position: "center top",
    },
    blocks: [
      { type: "eyebrow", text: "d) Reztos" },
      { type: "title", text: "Reztos", accent: "Restaurant OS" },
      { type: "rating", stars: 5 },
      {
        type: "para",
        text: "A comprehensive restaurant operating platform that unifies QR ordering, billing, kitchen operations, inventory management, waiter management, loyalty, and multi-outlet administration into a single intelligent ecosystem. Reztos replaces multiple disconnected tools with one scalable platform that enhances operational efficiency and elevates the dining experience.",
      },
      { type: "eyebrow", text: "Business Value" },
      {
        type: "bullets",
        items: [
          "Unified restaurant operations platform",
          "QR ordering & digital customer experience",
          "Smart kitchen, inventory & staff management",
          "Multi-outlet analytics & business intelligence",
        ],
      },
    ],
  },

  /* ------------------------------------------------ 18 dadchicko + medicharm */
  {
    folio: 18,
    variant: "product",
    section: "Products",
    blocks: [
      { type: "eyebrow", text: "e) & f)" },
      { type: "title", text: "Also in", accent: "the portfolio." },
      {
        type: "cards",
        items: [
          {
            title: "dadchicko",
            body: "Vendor e-commerce platform in the quick-commerce model — multi-vendor catalogue, rapid fulfilment and storefront management.",
            thumb: {
              src: "/works/ecom-ai.png",
              alt: "E-commerce analytics dashboard",
            },
          },
          {
            title: "Medicharm",
            body: "Pharmacy platform built for Vynuk — inventory, compliance and retail pharmacy operations in one system.",
            thumb: {
              src: "/works/health-telemedicine.png",
              alt: "Healthcare platform interface",
            },
          },
        ],
      },
      {
        type: "link",
        href: "https://www.thegr8labs.com/products",
        label: "thegr8labs.com/products",
      },
    ],
  },

  /* ---------------------------------------------------- 19 live innovations */
  {
    folio: 19,
    variant: "editorial",
    section: "Live Innovations",
    blocks: [
      { type: "eyebrow", text: "10 — Live Innovations" },
      { type: "title", text: "In the", accent: "lab, now." },
      {
        type: "numbered",
        items: [
          {
            n: "01",
            title: "Mule Account",
            body: "Machine learning models for detecting mule-account behaviour in financial transaction networks.",
          },
          {
            n: "02",
            title: "Drishti",
            body: "Data analytics platform turning operational telemetry into decision-grade insight.",
          },
          {
            n: "03",
            title: "MAI",
            body: "Meeting AI assistant — capture, summarisation and action tracking across conversations.",
          },
          {
            n: "04",
            title: "Shipmind",
            body: "Edge computing for logistics — intelligence that runs where the data is created.",
          },
          {
            n: "05",
            title: "PMS — Catchod",
            body: "Property and operations management system built for multi-site administration.",
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 20 R&D */
  {
    folio: 20,
    variant: "editorial",
    section: "R&D",
    image: {
      src: "/magazine/rd_lab.png",
      alt: "Comfinity research and development lab",
      position: "center center",
    },
    blocks: [
      { type: "eyebrow", text: "11 — Research & Development" },
      { type: "title", text: "Research is the", accent: "engine." },
      {
        type: "lede",
        text: "At Comfinity Technologies, Research & Development is the driving force behind our innovation.",
      },
      { type: "rule" },
      {
        type: "para",
        text: "We continuously explore emerging technologies, industry trends, and evolving business challenges to develop intelligent, scalable, and future-ready digital solutions.",
      },
      {
        type: "para",
        text: "Our R&D team focuses on transforming research into practical products that solve real-world business problems across industries including healthcare, education, retail, manufacturing, logistics, finance, and real estate.",
      },
      {
        type: "tags",
        items: [
          "Healthcare",
          "Education",
          "Retail",
          "Manufacturing",
          "Logistics",
          "Finance",
          "Real Estate",
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- 21 closing */
  {
    folio: 21,
    variant: "editorial",
    section: "Next",
    blocks: [
      { type: "eyebrow", text: "12 — Let's Build Together" },
      { type: "title", text: "Start with a", accent: "conversation." },
      {
        type: "lede",
        text: "Tell us what is in the way. We will tell you honestly whether technology is the answer.",
      },
      { type: "rule" },
      { type: "link", href: "/contact", label: "Talk to the team" },
      { type: "link", href: "/works", label: "Browse our work" },
      { type: "link", href: "/solutions", label: "Explore solutions" },
    ],
  },

  /* ----------------------------------------------------------- 22 back cover */
  {
    folio: null,
    variant: "backCover",
    blocks: [
      { type: "title", text: "Comfinity", accent: "Technologies" },
      {
        type: "lede",
        text: "Innovation & Technology Partner",
      },
      { type: "eyebrow", text: "Product Magazine — 2026 Edition" },
    ],
  },
];

/** Jump targets used by the contents page. Folio → page index. */
export const folioToIndex = (folio: number) =>
  magazinePages.findIndex((p) => p.folio === folio);
