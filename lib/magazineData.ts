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
  fit?: "cover" | "contain" | "fill";
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
      /** "sm" sets the card a step down — for a page that already carries a
       *  full list above it */
      size?: "sm";
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
      /** each row carries a picture under its copy. Rows without `image` render
       *  a labelled placeholder, so the grid holds its shape while art is sourced.
       *  `"side"` instead runs every row as a full-width card — art on the left,
       *  copy on the right — and the rows split the page's leftover height. */
      art?: boolean | "side";
      items: { n: string; title: string; body: string; image?: PageImage }[];
    }
  | {
      type: "iconList";
      /** "sm" sets the list a step down — for a page carrying a list plus
       *  something else above it */
      size?: "sm";
      items: { icon: string; title: string; body: string }[];
    }
  | {
      /** profile rows — a portrait beside the copy, the side alternating down
       *  the page so consecutive rows mirror each other. The first row puts the
       *  portrait on the right. Rows share the page's leftover height. */
      type: "profiles";
      items: {
        name: string;
        role?: string;
        tagline?: string;
        body?: string;
        quote?: string;
        image?: PageImage;
      }[];
    }
  | {
      /** partner marks set in circles, three across. An item without `src`
       *  prints an empty ring so the wall holds its shape while the logos are
       *  collected. */
      type: "logos";
      items: { name?: string; src?: string; alt?: string }[];
    }
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
      /** drop the frame's rule and tint so the art sits straight on the paper —
       *  for diagrams that already carry their own white ground */
      bare?: boolean;
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
      /** roster of faces. An item without `image` prints an empty frame, so the
       *  grid holds its shape while the portraits are collected. The grid
       *  stretches to fill the page's leftover height — two rosters on one page
       *  therefore print at matching size.
       *
       *  3 and up run as a plain contact sheet: portrait with a name under it.
       *  `columns: 2` instead sets each person as a card — portrait on the
       *  left, name and copy alongside — which is the only form with room for
       *  a `body`. */
      type: "people";
      columns?: 2 | 3 | 4 | 5;
      items: { name?: string; role?: string; body?: string; image?: PageImage }[];
    }
  | {
      /** product hero: one screen held in the middle with four satellite
       *  screens flanking it, two a side. `around` reads in visual order —
       *  left-top, right-top, left-bottom, right-bottom. */
      type: "deviceCluster";
      center: PageImage;
      around: PageImage[];
    }
  | {
      type: "cards";
      items: { title: string; body: string; thumb?: PageImage }[];
    }
  | {
      /** showcase cards — a picture over each card's caption. Takes sites,
       *  products or projects. Cards run two across and an odd last one takes
       *  the full measure, so a set of three reads as two on top and one
       *  beneath. An item without `image` prints a waiting frame; one with no
       *  caption fields at all is art alone. Several of these on a page share
       *  the leftover height equally.
       *
       *  `layout: "rows"` instead stacks every item as a full-width card — art
       *  left, copy right — sized by its own content rather than stretching.
       *  That is the form with room for a `body`, and an item with no `image`
       *  there is copy alone rather than a waiting frame. */
      type: "sites";
      layout?: "rows";
      items: {
        name?: string;
        url?: string;
        body?: string;
        image?: PageImage;
        /** several pictures sharing one card's picture area, side by side, over
         *  a single caption — `images` wins over `image` when both are set */
        images?: PageImage[];
      }[];
    }
  | {
      type: "stats";
      /** 4 lays the figures out as a single compact strip */
      columns?: 2 | 4;
      items: { value: string; label: string; pending?: boolean }[];
    }
  | { type: "tags"; items: string[] }
  | {
      /** grid of pull-quote cards, two across, sharing the page's leftover
       *  height. Fields are optional so a card can stand as a placeholder while
       *  the quote and portrait are being collected. */
      type: "quoteCards";
      /** "sm" sets the cards a step down — for a page carrying eight of them */
      size?: "sm";
      items: { text?: string; by?: string; role?: string; avatar?: PageImage }[];
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
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786263212/set_e5em1p.png",
      alt: "Comfinity Technologies front cover",
      fit: "fill",
      position: "center",
    },
    blocks: [],
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
    section: "Contents",
    blocks: [
      { type: "eyebrow", text: "02 — Contents" },
      { type: "title", text: "Contents." },
      {
        type: "quote",
        align: "center",
        text: "From complexity to clarity. From ideas to impact.",
      },
      {
        /* The office strip belongs to Contents alone — folio 2 faces this page,
           so carrying a copy there put the same four photos on one spread. */
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
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/f_auto,q_auto,w_1600/v1785956468/minute_bazaar_qc0d70.jpg",
      alt: "Minute Bazaar hyperlocal commerce app on a phone",
      position: "center top",
    },
    blocks: [
      { type: "eyebrow", text: "a) Minute Bazaar" },
      { type: "title", text: "Minute Bazaar", accent: "Hyperlocal Commerce" },
      {
        /* the poster runs above the copy, the way the Fliqket cluster does.
           `fill` lets it take whatever height the copy leaves, and `contain`
           keeps the whole creative rather than cropping a band out of it */
        type: "figure",
        fill: true,
        bare: true,
        image: {
          src: "https://res.cloudinary.com/xnulqi5v/image/upload/f_auto,q_auto,w_1600/v1786114624/Gemini_Generated_Image_pt3eb5pt3eb5pt3e_zabfeg.png",
          alt: "Minute Bazaar — the all-in-one platform for modern life in Palakkad, with home services, restaurants, taxi, supermarket and health care",
          fit: "contain",
        },
      },
      {
        type: "para",
        /* held to two lines, as on the Fliqket page — the poster above needs
           the height, and the bullets below carry the detail */
        text: "Comfinity's flagship hyperlocal commerce platform — storefront, orders and local delivery for retailers and supermarkets.",
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
      {
        /* the product itself, held as the top half of the page */
        type: "deviceCluster",
        center: {
          src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786041793/WhatsApp_Image_2026-08-06_at_8.14.40_PM_l76sr8.jpg",
          alt: "Fliqket home screen with the featured film carousel",
        },
        around: [
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786041792/1000133958_bmevmw.jpg",
            alt: "Film detail screen with pay-per-view unlock",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786041793/WhatsApp_Image_2026-08-06_at_8.14.40_PM_1_udzd2r.jpg",
            alt: "Explore — browse by category, genre and language",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786041793/1000133957_d6pyht.jpg",
            alt: "Subscription plans and checkout",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786041792/WhatsApp_Image_2026-08-06_at_8.14.40_PM_2_zarfmv.jpg",
            alt: "Profile with creator account application",
          },
        ],
      },
      {
        type: "para",
        text: "A creator OTT platform that lets filmmakers and production houses launch, manage and monetise their own streaming ecosystem.",
      },
      { type: "eyebrow", text: "Business Value" },
      {
        type: "bullets",
        items: [
          "Flexible monetisation — SVOD, TVOD & PPV",
          "Secure streaming with enterprise content protection",
          "Multi-tenant content, user & subscription management",
          "Real-time audience engagement and revenue analytics",
        ],
      },
    ],
  },

  /* ----------------------------------------------------------------- 9 repz */
  {
    folio: 9,
    variant: "product",
    section: "Products",
    /* no full-bleed art — the page runs on plain paper so the suite graphic
       above the copy is the only picture on it */
    blocks: [
      { type: "eyebrow", text: "c) Repz" },
      { type: "title", text: "Repz", accent: "Influencer & Brand" },
      {
        /* the artwork runs above the copy, as on the Minute Bazaar and Fliqket
           pages. `fill` gives it whatever height the copy leaves */
        type: "figure",
        fill: true,
        bare: true,
        image: {
          src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786116446/Gemini_Generated_Image_thacc0thacc0thac_sqejcu.png",
          alt: "Repz complete suite — diet plans, earnings, attendance and fees in one platform",
          fit: "contain",
        },
      },
      {
        /* held to two lines so the artwork above keeps its height */
        type: "para",
        text: "An influencer collaboration platform connecting brands with creators — discovery, campaign execution and performance tracking in one.",
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
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/f_auto,q_auto,w_1600/v1785956469/reztos_nf6uzf.jpg",
      alt: "Reztos restaurant operating system on a tablet",
      position: "center top",
    },
    blocks: [
      { type: "eyebrow", text: "d) Reztos" },
      { type: "title", text: "Reztos", accent: "Restaurant OS" },
      {
        /* the source runs 0.45:1 — far taller than any frame on the page, so it
           fills the frame and the crop is held on the cluster of screens rather
           than letterboxed down to a ~100px sliver */
        type: "figure",
        fill: true,
        image: {
          src: "https://res.cloudinary.com/xnulqi5v/image/upload/f_auto,q_auto,w_1600/v1786124222/Gemini_Generated_Image_tyml81tyml81tyml_vhwbpt.png",
          alt: "Reztos on the floor — menu, live tables, feedback and billing across five screens",
          position: "center 30%",
        },
      },
      {
        /* held to two lines so the artwork above keeps its height */
        type: "para",
        text: "A restaurant operating platform unifying QR ordering, billing, kitchen, inventory and multi-outlet administration in one system.",
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
      /* two showcase blocks stacked — each takes an equal share of the leftover
         height, so DadChico holds the top half and Medicharm the bottom */
      {
        type: "sites",
        items: [
          {
            name: "DadChico",
            body: "Vendor e-commerce platform in the quick-commerce model — multi-vendor catalogue, rapid fulfilment and storefront management.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786113981/image_17_ncapkf.png",
              alt: "DadChico storefront — fresh groceries delivered fast, from multiple stores in one marketplace",
              /* a 2:1 hero in a wider band — centre it so the headline and the
                 basket survive rather than only the nav bar */
              position: "center",
            },
          },
        ],
      },
      {
        type: "sites",
        items: [
          {
            name: "Medicharm",
            body: "Pharmacy platform built for Vynuk — inventory, compliance and retail pharmacy operations in one system.",
            images: [
              {
                src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786114307/Medicharm_sj9f3i.png",
                alt: "Medicharm",
                /* a portrait logo — letterbox it rather than crop the mark */
                fit: "contain",
              },
              {
                src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786114278/IMG-20260807-WA0026_e3mowy.jpg",
                alt: "Medicharm dashboard — payables, stock alerts and recent sales",
                position: "center top",
              },
            ],
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
        bare: true,
        image: {
          src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786077490/image_10_qoc20e.png",
          alt: "The project development thinking framework — ideate, improve, analyze, adapt, plan, learn, execute, monitor",
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
        columns: 1,
        art: "side",
        items: [
          {
            n: "01",
            title: "Drishti",
            body: "Data analytics platform turning operational telemetry into decision-grade insight.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786076201/Gemini_Generated_Image_qxqllmqxqllmqxql_abpujy.png",
              alt: "Drishti intelligence dashboard — world map, live feeds, threat alerts and trend analysis",
            },
          },
          {
            n: "02",
            title: "MAI",
            body: "Meeting AI assistant — capture, summarisation and action tracking across conversations.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786076201/Gemini_Generated_Image_s3s2q3s3s2q3s3s2_wtrwch.png",
              alt: "MAI listening in on a boardroom meeting, surfacing notes and task assignments",
              position: "center 45%",
            },
          },
          {
            n: "03",
            title: "EcLearning",
            body: "Learning platform for institutions — courses, assessments and progress tracking in one place.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786113630/Screenshot_2026-08-07_201004_ogc80c.png",
              alt: "EcLearning secure sign-in, with AI risk engine and two-factor login",
              /* a portrait screen in a landscape frame — hold the top so the
                 shield and title survive the crop */
              position: "center top",
            },
          },
          {
            n: "04",
            title: "BhootAgent",
            body: "Autonomous AI agents that carry out multi-step work across a business's own systems.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786113897/IMG-20260711-WA0043_hvz5tk.jpg",
              alt: "BhootAgent listening and answering in a live voice conversation",
              position: "center",
            },
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- 14 best sellers */
  /* NB: page order is what puts a page left or right in a spread — an odd index
     in this array falls on the left page, an even index on the right */
  {
    folio: 14,
    variant: "editorial",
    section: "Best Sellers",
    blocks: [
      { type: "eyebrow", text: "08 — Best Sellers" },
      { type: "title", text: "Best", accent: "sellers." },
      {
        /* add `image: { src, alt }` to each site as the screenshots land, and a
           `url` / `body` line if the card should carry one */
        type: "sites",
        items: [
          {
            name: "Toni&Guy",
            url: "toniandguyhopecollege.in",
            image: {
              src: "https://res.cloudinary.com/dpu9ikeqe/image/upload/v1772541337/WhatsApp_Image_2026-02-25_at_12.44.58_PM_2_ihlbwt.jpg",
              alt: "Toni&Guy Hope College website",
            },
          },
          {
            name: "IndianRenters",
            /* staging address — swap for the live domain before print */
            url: "31-97-202-194.sslip.io",
            image: {
              src: "https://res.cloudinary.com/dpu9ikeqe/image/upload/v1786090207/Screenshot_2026-08-07_133930_vgt7fc.png",
              alt: "IndianRenters website",
            },
          },
        ],
      },
      { type: "eyebrow", text: "Our Strategic Partners" },
      {
        type: "sites",
        items: [
          {
            name: "thegr8labs",
            url: "thegr8labs.com",
            body: "Software that thinks. Products that perform.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786096068/image_11_wzvcnm.png",
              alt: "thegr8labs website — why thegr8labs",
            },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------- 15 cultures */
  {
    folio: 15,
    variant: "editorial",
    section: "Comfinity Cultures",
    blocks: [
      { type: "eyebrow", text: "09 — Comfinity Cultures" },
      {
        type: "title",
        text: "Meet the minds behind",
        accent: "Comfinity.",
        boxed: true,
      },
      { type: "eyebrow", text: "Our Core" },
      {
        /* roles are set in caps by the stylesheet, so they are written plainly
           here. Portraits crop to a 3:4 frame — the two square sources are
           centred subjects, so the side trim costs nothing. */
        type: "people",
        columns: 2,
        items: [
          {
            name: "Archana G",
            role: "AI & Data Science Engineer",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786106390/Gemini_Generated_Image_t3cdn8t3cdn8t3cd_dt61od.png",
              alt: "Archana G",
            },
          },
          {
            name: "Sudheesh Ravichandran",
            role: "Foundational Software Engineer",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786109538/ChatGPT_Image_Aug_7_2026_06_59_41_PM_y6knoc.png",
              alt: "Sudheesh Ravichandran",
            },
          },
          {
            name: "Binil B",
            role: "Foundational Software Engineer",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786106390/Gemini_Generated_Image_c0k99c0k99c0k99c_wj1soc.png",
              alt: "Binil B",
            },
          },
          {
            name: "Jeevagan S",
            role: "Founding Infrastructure Architect",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786109536/jeevagan_ydxt89.jpg",
              alt: "Jeevagan S",
            },
          },
          {
            name: "Aman M B",
            role: "Data & Systems Engineer — AI Operations",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786109536/aman_zbsuxz.jpg",
              alt: "Aman M B",
            },
          },
          {
            name: "Razaan R",
            role: "Principal AI & Data Architect",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786109838/razaan_1_nbxtvc.jpg",
              alt: "Razaan R",
            },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------- 16 interns */
  {
    folio: 16,
    variant: "editorial",
    section: "Interns Community",
    blocks: [
      { type: "eyebrow", text: "10 — Interns Community" },
      { type: "title", text: "Interns", accent: "community." },
      {
        /* four to a page, carried over onto the facing page. Eight of these on
           one page leaves ~115 characters a card; the quotes run to 370, so the
           roster is set across the opening instead of being cut down. */
        type: "quoteCards",
        size: "sm",
        items: [
          {
            by: "Atchaya",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786111640/Atchaya_inuxkc.png",
              alt: "Atchaya",
            },
            text: "My experience here has been a wonderful learning journey. Coming from a non-IT background, I got the opportunity to explore the IT field, gain industry exposure, and work on real-world projects. This experience helped me build my confidence and improve my skills, and I am truly grateful for the support, guidance, and opportunities that helped me grow professionally.",
          },
          {
            by: "Midhun M",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786111639/Midhun_M_r9yzjg.jpg",
              alt: "Midhun M",
            },
            text: "This internship offered an incredible balance of challenge and support. Stepping out of my comfort zone to work with dynamic tools and real-world projects helped me elevate my skillset significantly. I'm incredibly thankful to the leadership and team for creating such a collaborative, motivating space to learn and innovate.",
          },
          {
            by: "Anjali C",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786111639/Anjali_C_voc03k.jpg",
              alt: "Anjali C",
            },
            text: "My internship at Comfinity Technologies Pvt. Ltd. was a valuable learning experience that helped me grow both technically and personally. The supportive mentors and collaborative, disciplined environment encouraged me to ask questions, explore new ideas, and continuously improve, and I am truly grateful for the opportunity and guidance throughout the journey.",
          },
          {
            by: "Medha V P",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786111639/Medha_V_P_nwmmss.jpg",
              alt: "Medha V P",
            },
            text: "This internship gave me practical exposure, strengthened my technical skills, and boosted my confidence to take on real-world challenges.",
          },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------- 17 interns ii */
  {
    folio: 17,
    variant: "editorial",
    section: "Interns Community",
    blocks: [
      { type: "eyebrow", text: "Interns Community" },
      {
        type: "quoteCards",
        size: "sm",
        items: [
          {
            by: "Akhila A",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786111640/Akhila_A_jbk36n.png",
              alt: "Akhila A",
            },
            text: "This internship has been one of the most valuable learning experiences of my career. It allowed me to explore diverse tools and technologies while constantly challenging me to grow, adapt, and improve myself. I sincerely thank the entire team for their guidance, encouragement, and the opportunity to be part of such an inspiring workplace.",
          },
          {
            by: "Viswas Krishna M",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786112163/Viswas_krishna_M_tmenne.jpg",
              alt: "Viswas Krishna M",
            },
            text: "Reflecting on this internship, I couldn't have asked for a better foundation for my professional journey. Working hands-on with innovative technologies while receiving such thoughtful guidance from the team helped me build both confidence and skill. Thank you to everyone for the unwavering encouragement, constructive feedback, and wonderful work culture.",
          },
          {
            by: "Ullas",
            role: "Marketing",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786112311/Gemini_Generated_Image_gy8vyogy8vyogy8v_d4s3bx.png",
              alt: "Ullas",
            },
            text: "Working as a marketing intern with this team has been an exceptionally inspiring experience. I had the privilege of exploring diverse creative channels, experimenting with new tools, and collaborating on dynamic campaigns that challenged me to grow every day. Thank you to everyone for fostering such an open, innovative, and supportive environment.",
          },
          {
            by: "Muppala Pooja",
            avatar: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786113420/Muppala_Pooja__stupo3.png",
              alt: "Muppala Pooja",
            },
            text: "Comfinity had a funny way of giving me “just one small task” that turned into an exciting deep dive into AI, OSINT, and cybersecurity. I can't complain though — that's exactly where the best learning happened.",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- 17 in progress */
  {
    folio: 18,
    variant: "editorial",
    section: "In Progress",
    blocks: [
      { type: "eyebrow", text: "11 — In Progress" },
      /* the title doubles as the first section's heading */
      { type: "title", text: "On", accent: "progress." },
      {
        type: "sites",
        layout: "rows",
        items: [
          {
            name: "Mule Account",
            body: "AI and graph analytics that expose mule accounts, suspicious transactions and hidden fraud networks in real time.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786076436/Gemini_Generated_Image_e2bi8pe2bi8pe2bi_trlflr.png",
              alt: "A network of suspicious accounts feeding one bank account, with linked-fraud graph and risk score",
            },
          },
          {
            name: "Catchod PMS",
            body: "The whole real-estate lifecycle — listings, leads, sales tracking and admin — in one automated platform.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786099433/360_F_689417243_0RHRsmN7jzR3RhZJa23x5kOWFwf0VpNK_oapwf2.jpg",
              alt: "Catchod property management system",
              position: "center",
            },
          },
        ],
      },
      { type: "eyebrow", text: "Ideation" },
      {
        /* still an idea, so no art — the card is copy alone */
        type: "sites",
        layout: "rows",
        items: [
          {
            name: "ShipMind",
            body: "An intelligent maritime platform for vessel operations, fleet monitoring and AI-assisted decisions — real-time visibility and data-driven fleet performance for shipping and logistics operators.",
          },
        ],
      },
      { type: "eyebrow", text: "Helping Hands" },
      {
        /* a row rather than a full-width band: the art column is close enough to
           the photo's own 4:3 that almost nothing is cropped, and the copy sits
           beside it. Description still to come — add it as `body` here. */
        type: "sites",
        layout: "rows",
        items: [
          {
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786099540/IMG-20260710-WA0020_x51atc.jpg",
              alt: "Comfinity handing over a laptop at a Helping Hands presentation",
              position: "center",
            },
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- 18 journey */
  {
    folio: 19,
    variant: "editorial",
    section: "The Journey",
    blocks: [
      { type: "eyebrow", text: "12 — The Road Ahead" },
      {
        /* the artwork carries its own headline, so it runs on its own with no
           page title above it — same treatment as the R&D framework diagram */
        type: "figure",
        fill: true,
        bare: true,
        image: {
          src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786106411/Gemini_Generated_Image_xrc34oxrc34oxrc3_h4fysv.png",
          alt: "A simplified strategic transformation journey — five steps from Foundation (2025–2026) through Acceleration, Expansion and Intelligence to Beyond (2032+)",
          fit: "contain",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- 19 partners */
  {
    folio: 20,
    variant: "editorial",
    section: "Partners",
    blocks: [
      { type: "eyebrow", text: "13 — Partners" },
      {
        /* no page title — dropping it gives the wall the page's top third and
           lets the rings run large */
        type: "logos",
        items: [
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786107210/logo-03_-_VigNesh_Gangadharan_ye0kmj.png",
            alt: "Partner logo — red speech-bubble mark",
          },
          {
            name: "BookMyPuja",
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786107216/Untitled_design_-_Abhi_Girin_hsj7ck.png",
            alt: "BookMyPuja",
          },
          {
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786107209/IMG-20251225-WA0005_1_-_Nithyasri_Sri_cknkte.jpg",
            alt: "Partner logo — gold and black arrow mark",
          },
          {
            name: "Krypton Loops",
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786107208/IMG-20260807-WA0015_-_Sooraj_Sudhev_Sid_le283s.jpg",
            alt: "Krypton Loops",
          },
          {
            name: "thegr8labs",
            /* the Cloudinary file supplied for this one is the white-on-dark
               variant, which disappears against the paper — this is the dark
               wordmark. Swap back once a dark variant is uploaded. */
            src: "/partners/thegr8labs.png",
            alt: "thegr8labs",
          },
          {
            name: "LV Surya Tech LLP",
            src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786107208/lvsuryatechlogo_-_Lata_Vishwanath_ihdros.jpg",
            alt: "LV Surya Tech LLP",
          },
        ],
      },
      { type: "eyebrow", text: "Why Partners Choose Comfinity" },
      {
        type: "iconList",
        size: "sm",
        items: [
          /* one line each — the logo wall above takes the page's top 40% */
          {
            icon: "🤝",
            title: "Business-First Approach",
            body: "We learn your business and goals before recommending any technology.",
          },
          {
            icon: "💡",
            title: "Innovation That Creates Impact",
            body: "AI, automation and creative thinking aimed at real-world problems.",
          },
          {
            icon: "🚀",
            title: "End-to-End Technology Partnership",
            body: "Strategy, design, build, deployment and continuous support.",
          },
          {
            icon: "🌍",
            title: "Scalable & Future-Ready Solutions",
            body: "Secure, adaptable products that evolve as your business grows.",
          },
          {
            icon: "🌱",
            title: "Trusted Relationships, Lasting Success",
            body: "Transparency, collaboration and shared success beyond delivery.",
          },
        ],
      },
      {
        type: "calloutCard",
        size: "sm",
        icons: ["🤝"],
        text: "At Comfinity, we don't just deliver technology — we build trusted partnerships that transform ideas into lasting business success.",
      },
    ],
  },

  /* -------------------------------------------------------------- 20 closing */
  {
    folio: 21,
    variant: "editorial",
    section: "Founders",
    blocks: [
      { type: "eyebrow", text: "14 — In Their Own Words" },
      {
        /* no page title — the two rows fill the page between them, and the
           roles and names carry the heading work */
        type: "profiles",
        items: [
          {
            name: "Sooraj Sudevan",
            role: "Founder & Chief Executive Officer",
            tagline: "Visionary. Builder. Believer in Dreamers.",
            body: "The founding architect of Comfinity's vision. Driven by a belief that technology must serve human dignity — and that the world's best ideas often come from people who have been told “no.” Before founding Comfinity, he spent years experimenting with technology, building relationships, and learning what it means to have your dreams dismissed — and then keep going anyway. He oversees strategy, vision, business development, and the human culture of the company.",
            quote: "We did not build Comfinity to become successful. We built it because the world needed this — and we were the ones willing to try.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786127353/Sooraj_photo_Linkedin_kmjfmr.png",
              alt: "Sooraj Sudevan",
              position: "center top",
            },
          },
          {
            name: "Ajay Krishna",
            role: "Co-Founder & Chief Technology Officer",
            tagline: "The Engineer of Ideas. The Architect of Systems.",
            body: "Ajay is the conceptual and technical backbone of Comfinity. He translates the founder's vision into engineering decisions — creating the bridge between what is imagined and what can be built. A quiet, focused thinker with deep technical capability and genuine belief in the company's mission.",
            quote: "Technology is a language. What matters is what you choose to say with it.",
            image: {
              src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786127372/Gemini_Generated_Image_4s2xgv4s2xgv4s2x_scz9e5.png",
              alt: "Ajay Krishna",
              position: "center top",
            },
          },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------- 21 back cover */
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
