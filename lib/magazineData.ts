/**
 * Comfinity Product Magazine 2026 — content model.
 *
 * Source: "Magazine and presentation for Company product 2026".
 * Sequenced into 20 pages / 10 leaves so every opening lands as a designed
 * spread. Keep the count even — the flipbook pairs page 2i / 2i+1 onto the
 * front and back of leaf i.
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
  | { type: "title"; text: string; accent?: string; boxed?: boolean }
  | { type: "lede"; text: string }
  | { type: "para"; text: string }
  | {
      type: "quote";
      text: string;
      by?: string;
      align?: "center";
      /** "sm" sets the quote a step down — for pages where it is a caption
       *  under a figure rather than the page's own voice */
      size?: "sm";
    }
  | {
      /** descending staircase of numbered steps, label and note alongside */
      type: "stairs";
      items: { n: string; icon?: string; title: string; body?: string; bullets?: string[] }[];
    }
  | {
      /** numbered one-line points — number left, label right, rule per row */
      type: "points";
      items: { n: string; label: string }[];
    }
  | {
      /** closing card: icon pair, a line of copy, and the running site */
      type: "calloutCard";
      icons: string[];
      text: string;
      note?: string;
    }
  | { type: "rule" }
  | { type: "rating"; stars: number }
  | { type: "link"; href: string; label: string }
  | { type: "bullets"; items: string[] }
  | {
      type: "numbered";
      /** 2 lays the list out as a grid — used when a page carries all six values */
      columns?: 1 | 2;
      items: { n: string; title: string; body: string }[];
    }
  | { type: "iconList"; items: { icon: string; title: string; body: string }[] }
  | {
      /** portrait art in the left column, nested blocks in a panel on the right */
      type: "split";
      image: PageImage;
      blocks: Block[];
    }
  | {
      /** compact icon cards. columns: 1 stacks them as single-line rows,
       *  which is how the intro page lists mission and vision headings. */
      type: "iconCards";
      columns?: 1 | 2 | 3;
      items: { icon?: string; image?: string; title: string; body?: string }[];
    }
  | {
      /** a single inset image, sized by aspect ratio rather than full bleed */
      type: "figure";
      image: PageImage;
      ratio?: string;
      /** grow to eat the leftover column height instead of sizing to `ratio` —
       *  used when the figure is meant to hold the top half of a page */
      fill?: boolean;
      caption?: string;
    }
  | {
      /** two panels side by side: copy on the left, art on the right.
       *  `right.image` may be omitted while the art is still being sourced —
       *  the slot renders as a labelled placeholder until it lands. */
      type: "duo";
      /** `body` takes an array when the panel runs to more than one paragraph */
      left: { title: string; body?: string | string[]; bullets?: string[] };
      right: {
        title: string;
        body?: string | string[];
        image?: PageImage;
        caption?: string;
      };
    }
  | {
      /** cover masthead: accent rule, headline and the line beneath it */
      type: "masthead";
      title: string;
      sub?: string;
    }
  | {
      type: "imageStrip";
      images: { src: string; alt: string }[];
    }
  | {
      type: "cards";
      items: { title: string; body: string; thumb?: PageImage }[];
    }
  | {
      type: "stats";
      /** 4 lays the figures out as a single compact strip */
      columns?: 2 | 4;
      items: { value: string; label: string; pending?: boolean }[];
    }
  | { type: "tags"; items: string[] }
  | {
      /** grid of pull-quote cards — no avatar, attribution only */
      type: "quoteCards";
      items: { text: string; by: string; role?: string }[];
    }
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
  /** corner mark printed bottom-right, over the art */
  logo?: PageImage;
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
    image: {
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786003361/hghg_uqjniu.png",
      alt: "Comfinity Technologies front cover",
      fit: "cover",
    },
    logo: {
      src: "/magazine/comfinity-logo-white.png",
      alt: "Comfinity Technologies",
    },
    blocks: [
      { type: "masthead", title: "Our Company", sub: "Corporate Profile" },
    ],
  },



  /* ------------------------------------------------- 2 about + mission */
  {
    folio: 2,
    variant: "editorial",
    section: "Who We Are",
    blocks: [
      { type: "eyebrow", text: "01 — Who We Are" },
      {
        type: "title",
        text: "Who We",
        accent: "Are.",
        boxed: true,
      },
      {
        type: "split",
        image: {
          src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786005301/WhatsApp_Image_2026-08-06_at_1.21.56_PM_bqdwi2.jpg",
          alt: "Comfinity founder speaking on stage",
          position: "100% center",
          zoom: 2.1,
        },
        blocks: [
          { type: "eyebrow", text: "About Us" },
          {
            type: "para",
            text: "We are a team of technology enthusiasts and industry experts, committed to helping organizations turn complexity into clarity and ideas into measurable impact.",
          },
        ],
      },
      {
        type: "imageStrip",
        images: [
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007588/WhatsApp_Image_2026-08-06_at_2.00.13_PM_ya5hpr.jpg",
            alt: "Modern architecture",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007589/WhatsApp_Image_2026-08-06_at_2.00.13_PM_2_qpltah.jpg",
            alt: "Glass skyscraper",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007630/WhatsApp_Image_2026-08-06_at_2.01.21_PM_sn0rp4.jpg",
            alt: "Team network icon",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007631/WhatsApp_Image_2026-08-06_at_2.00.13_PM_1_yyhosz.jpg",
            alt: "Corporate hub",
          },
        ],
      },
      { type: "eyebrow", text: "Our Mission" },
      {
        type: "iconCards",
        columns: 1,
        items: [
          { icon: "🎯", title: "Understand Before We Build" },
          { icon: "🚀", title: "Drive Meaningful Innovation" },
          { icon: "🤝", title: "Build Long-Term Partnerships" },
        ],
      },
      { type: "eyebrow", text: "Our Vision" },
      {
        type: "iconCards",
        columns: 3,
        items: [
          {
            image: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007324/Gemini_Generated_Image_y8tbq3y8tbq3y8tb_zlbff1.png",
            title: "Transform Challenges into Intelligence",
          },
          {
            image: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007320/Gemini_Generated_Image_e8ycmze8ycmze8yc_uwzp36.png",
            title: "Turn Ideas into Impact",
          },
          {
            image: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007321/Gemini_Generated_Image_13wnzh13wnzh13wn_txvozv.png",
            title: "Build the Future Together",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- 3 core values */
  {
    folio: 3,
    variant: "editorial",
    section: "Core Values",
    blocks: [
      { type: "eyebrow", text: "02 — Core Values" },
      { type: "title", text: "Core", accent: "Values." },
      {
        type: "quote",
        align: "center",
        text: "From complexity to clarity. From ideas to impact.",
      },
      {
        type: "imageStrip",
        images: [
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007588/WhatsApp_Image_2026-08-06_at_2.00.13_PM_ya5hpr.jpg",
            alt: "Comfinity workspace",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007589/WhatsApp_Image_2026-08-06_at_2.00.13_PM_2_qpltah.jpg",
            alt: "Comfinity office interior",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007630/WhatsApp_Image_2026-08-06_at_2.01.21_PM_sn0rp4.jpg",
            alt: "Comfinity engineer at work",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007631/WhatsApp_Image_2026-08-06_at_2.00.13_PM_1_yyhosz.jpg",
            alt: "Comfinity work floor",
          },
        ],
      },
      {
        type: "points",
        items: [
          { n: "01", label: "Business First" },
          { n: "02", label: "Innovation with Purpose" },
          { n: "03", label: "Partnership & Trust" },
          { n: "04", label: "Excellence in Execution" },
          { n: "05", label: "Continuous Learning" },
          { n: "06", label: "Integrity" },
        ],
      },
      {
        type: "calloutCard",
        icons: ["👥", "🌐"],
        text: "Things get interesting when you flip it.",
        note: MAGAZINE_SITE,
      },
    ],
  },

  /* ----------------------------------------------------------- 4 why us */
  {
    folio: 4,
    variant: "editorial",
    section: "Why Us",
    blocks: [
      { type: "eyebrow", text: "03 — Why Us" },
      { type: "title", text: "Why", accent: "us." },
      {
        type: "stairs",
        items: [
          {
            n: "01",
            icon: "🎯",
            title: "The Comfinity Difference",
            bullets: [
              "Business-First Thinking",
              "Innovation with Purpose",
              "End-to-End Technology Partnership",
              "Building the Future Together",
            ],
          },
          {
            n: "02",
            icon: "⚙️",
            title: "Our Expertise (Capabilities)",
            bullets: [
              "🧭 Business Strategy & Transformation",
              "⚙️ Digital Engineering & Product Development",
              "🧠 AI, Automation & Intelligent Systems",
              "🌱 Innovation, Research & Talent Development",
            ],
          },
          {
            n: "03",
            icon: "🧩",
            title: "Solutions We Deliver (Services)",
            bullets: [
              "AI & Intelligent Automation",
              "Custom Software & Digital Platforms",
              "Digital Transformation & Cloud Solutions",
              "Product Engineering & Technology Consulting",
            ],
          },
          {
            n: "04",
            icon: "🌐",
            title: "Industries We Empower (Who You Serve)",
            bullets: [
              "Startups & Scale-ups",
              "Enterprises",
              "🏭 Industry Verticals",
              "🌐 Government & Innovation Ecosystems",
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------- 5 client reviews */
  {
    folio: 5,
    variant: "editorial",
    section: "Client Reviews",
    blocks: [
      { type: "eyebrow", text: "04 — Client Reviews" },
      { type: "reviews",
        items: [
          {
            name: "Ajay",
            org: "REPZ Platform",
            avatar: "/reviews/ajay.png",
            quote: "Managing our gym used to be fragmented. REPZ brought everything into one platform, giving us complete visibility.",
            pending: false,
          },
          {
            name: "Sreejith",
            org: "Minute Bazaar",
            avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027075/WhatsApp_Image_2026-08-06_at_4.18.10_PM_u8l7va.jpg",
            quote: "Going online was so easy! Order management and delivery run smoothly every day, and customers are happy.",
            pending: false,
          },
          {
            name: "Vignesh",
            org: "Fliqket OTT",
            avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027078/Gemini_Generated_Image_bay672bay672bay6_lp8sgz.png",
            quote: "What impressed us most was Fliqket's creator-first approach, secure streaming, and audience analytics.",
            pending: false,
          },
          {
            name: "Aravind",
            org: "Retail Marketplace",
            avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027076/WhatsApp_Image_2026-08-06_at_4.02.11_PM_p21bfa.jpg",
            quote: "Comfinity helped transform our grocery store into a digital marketplace. Everything is effortless now.",
            pending: false,
          },
          {
            name: "Sujin",
            org: "Medicharm Pharma",
            avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027872/Gemini_Generated_Image_jat3b3jat3b3jat3_mojez2.png",
            quote: "Managing inventory across branches used to be chaotic. Their system gave us complete real-time sync.",
            pending: false,
          },
          {
            name: "Arun",
            org: "Reztos OS",
            avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027076/Gemini_Generated_Image_rbbntzrbbntzrbbn_wfwyi5.png",
            quote: "Reztos made running our restaurant so much easier — QR ordering, billing, and multi-outlet management in one.",
            pending: false,
          },
        ],
      },
      { type: "link", href: "/works", label: "Read all client reviews" },
    ],
  },



  /* ------------------------------------------------------- 6 products divider */
  {
    folio: 6,
    variant: "divider",
    section: "Portfolio",
    blocks: [
      { type: "eyebrow", text: "05 — Products & Portfolio" },
      { type: "title", text: "Things we have", accent: "built so far." },
      {
        type: "lede",
        text: "Six platforms in production across commerce, streaming, marketing, hospitality and pharma.",
      },
    ],
  },

  /* -------------------------------------------------------- 7 minute bazaar */
  {
    folio: 7,
    variant: "product",
    section: "Products",
    image: {
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1785956468/minute_bazaar_qc0d70.jpg",
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

  /* -------------------------------------------------------------- 8 fliqket */
  {
    folio: 8,
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

  /* ----------------------------------------------------------------- 9 repz */
  {
    folio: 9,
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

  /* --------------------------------------------------------------- 10 reztos */
  {
    folio: 10,
    variant: "product",
    section: "Products",
    image: {
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1785956469/reztos_nf6uzf.jpg",
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

  /* ------------------------------------------------ 11 dadchicko + medicharm */
  {
    folio: 11,
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

  /* ------------------------------------------------------------------ 12 R&D */
  {
    folio: 12,
    variant: "editorial",
    section: "R&D",
    blocks: [
      { type: "eyebrow", text: "06 — Research & Development" },
      {
        /* no page title — the diagram runs straight off the eyebrow so it
           holds the top half of the page on its own */
        type: "figure",
        fill: true,
        image: {
          src: "/magazine/cognitive-cycle.png",
          alt: "The R&D cognitive cycle — ideate, improve, analyze, adapt, plan, learn, execute, monitor",
          fit: "contain",
        },
      },
      {
        type: "quote",
        align: "center",
        size: "sm",
        text: "By empowering young minds and embracing continuous research, we cultivate innovations that solve today's challenges and shape tomorrow's opportunities.",
      },
      {
        type: "duo",
        left: {
          title: "Importance of Research & Development",
          body: [
            "At Comfinity Technologies, Research & Development is the driving force behind our innovation. We continuously explore emerging technologies, industry trends, and evolving business challenges to develop intelligent, scalable, and future-ready digital solutions.",
            "Our R&D team focuses on transforming research into practical products that solve real-world business problems across industries including healthcare, education, retail, manufacturing, logistics, finance, and real estate.",
          ],
        },
        right: {
          title: "Young Minds",
          body: [
            "Many breakthrough innovations begin with a single idea backed by continuous experimentation.",
            "Comfinity brings together students, engineers, researchers, and entrepreneurs to transform promising ideas into scalable technology solutions.",
          ],
          image: {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786038119/1000133888_x65t6u.jpg",
            alt: "The young engineers and researchers behind Comfinity's R&D work",
            fit: "cover",
          },
        },
      },
    ],
  },

  /* ---------------------------------------------------- 13 live innovations */
  {
    folio: 13,
    variant: "editorial",
    section: "Live Innovations",
    blocks: [
      { type: "eyebrow", text: "07 — Live Innovations" },
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

  /* -------------------------------------------------------------- 14 closing */
  {
    folio: 14,
    variant: "editorial",
    section: "Next",
    blocks: [
      { type: "eyebrow", text: "08 — Let's Build Together" },
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

  /* ----------------------------------------------------------- 15 back cover */
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
