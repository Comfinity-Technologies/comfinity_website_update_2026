export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: "AI & Automation" | "Enterprise & Cloud" | "IoT & Hardware" | "HealthTech" | "FinTech & E-Commerce" | "Media & Streaming";
  tagline: string;
  metric: string;
  metricLabel: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  year: string;
  featured: boolean;
  liveUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "fliqket-ott",
    slug: "fliqket-ott-streaming-platform",
    title: "FliQket — Next-Gen OTT Streaming & Creator Studio Platform",
    client: "FliQket Media",
    category: "Media & Streaming",
    tagline: "Cross-platform video streaming, automated creator payouts, and dynamic PPV content gating.",
    metric: "100K+",
    metricLabel: "Active Viewers & Streamers",
    image: "/works/fliqket-ott.png",
    liveUrl: "https://fliqket.com",
    summary: "Built a high-performance OTT entertainment ecosystem featuring adaptive video streaming, 20% watch-time view count gating, creator monetization dashboards, and cross-platform mobile apps.",
    challenge: "FliQket needed a scalable OTT platform capable of serving HD video content across web and mobile, handling Pay-Per-View (PPV) rentals, precise watch-time view verification, and automated release buffering without stream buffering.",
    solution: "Engineered cross-platform mobile applications using Flutter paired with a Next.js web portal and Node.js microservices backend. Implemented HLS adaptive bitrate video streaming, real-time engagement telemetry, and secure payment processing.",
    results: [
      "Over 100,000 active viewers onboarded across mobile and web platforms",
      "Precise 20% watch-time algorithm gating view counts & creator royalties",
      "Sub-second video initialization latency with 99.9% stream availability",
      "Seamless PPV & rental monetization with real-time creator studio analytics"
    ],
    technologies: ["Flutter", "Next.js", "Node.js", "HLS Streaming", "AWS Cloud", "PostgreSQL", "Redis"],
    year: "2026",
    featured: true,
    testimonial: {
      quote: "Comfinity built FliQket from concept to a high-scale OTT platform. The video playback performance and creator studio analytics are exceptional.",
      author: "FliQket Product Team",
      role: "Leadership Team",
      company: "FliQket Media"
    }
  },
  {
    id: "ai-logistics",
    slug: "ai-logistics-route-optimization",
    title: "AI Logistics Telemetry & Route Optimization Engine",
    client: "TransLogistics Asia",
    category: "AI & Automation",
    tagline: "Autonomous routing and real-time fleet intelligence across 4 countries.",
    metric: "−70%",
    metricLabel: "Manual Dispatch Time",
    image: "/works/ai-logistics.png",
    summary: "Built an end-to-end intelligent dispatch platform that analyzes live traffic patterns, weather events, and driver metrics to autonomously recalculate optimal delivery routes in real time.",
    challenge: "The client suffered high fuel burn and operational bottlenecks caused by manual dispatch decisions across 1,200 fleet vehicles operating in congested Southeast Asian logistics hubs.",
    solution: "Engineered a custom AI model integrated with real-time GPS telemetry, WebSocket event streaming, and an intuitive dispatch manager dashboard.",
    results: [
      "Reduced fleet fuel expenditure by 24% in the first quarter",
      "Decreased average delivery dispatch turnaround from 45 mins to under 3 mins",
      "Zero downtime handling 50,000 daily route updates"
    ],
    technologies: ["Next.js", "Python PyTorch", "AWS Lambda", "PostgreSQL", "WebSockets", "GSAP"],
    year: "2025",
    featured: true,
    testimonial: {
      quote: "Comfinity transformed our multi-country logistics operations with an AI platform that was intuitive for our team from Day 1.",
      author: "David Tan",
      role: "VP of Logistics Technology",
      company: "TransLogistics Asia"
    }
  },
  {
    id: "fintech-erp",
    slug: "enterprise-banking-erp-modernization",
    title: "Enterprise Banking & ERP Modernization",
    client: "NexaBank Global",
    category: "FinTech & E-Commerce",
    tagline: "Migrating legacy monolithic core systems into cloud-native microservices.",
    metric: "99.999%",
    metricLabel: "Uptime Guaranteed",
    image: "/works/fintech-erp.png",
    summary: "Rebuilt legacy monolithic core infrastructure into high-throughput microservices capable of serving millions of concurrent daily transactions with sub-10ms response times.",
    challenge: "10-year-old monolithic software caused frequent peak-hour latency spikes and high deployment risks for financial operations.",
    solution: "Implemented an event-driven architecture using Kafka message streaming, automated ledger reconciliation, and secure client-facing web and mobile APIs.",
    results: [
      "Processed over 5,000,000 daily transaction events flawlessly",
      "Improved api latency from 420ms to 8ms",
      "Full regulatory compliance certification achieved on first audit"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Kafka", "Kubernetes", "Redis", "PostgreSQL"],
    year: "2025",
    featured: true,
    testimonial: {
      quote: "The speed of execution and architectural precision Comfinity brought to our core modernization project was world-class.",
      author: "Sarah Jenkins",
      role: "Chief Technology Officer",
      company: "NexaBank Global"
    }
  },
  {
    id: "iot-fleet",
    slug: "iot-connected-fleet-telemetry",
    title: "IoT Connected Hardware Fleet Telemetry",
    client: "ColdChain Express",
    category: "IoT & Hardware",
    tagline: "Hardware-software integration for real-time cold chain sensor monitoring.",
    metric: "12,000+",
    metricLabel: "Active Sensor Nodes",
    image: "/works/iot-fleet.png",
    summary: "Engineered low-latency custom firmware and cloud telemetry ingestion pipeline for tracking temperature, humidity, and door tamper events across pharmaceutical transport trucks.",
    challenge: "Perishable cargo losses incurred heavy financial damage due to delayed alerts when refrigeration units malfunctioned in transit.",
    solution: "Designed hardware edge gateway software paired with MQTT cloud pipelines and instantaneous multi-channel push and SMS alerts.",
    results: [
      "99.4% reduction in cargo loss incidents across pharmaceutical routes",
      "Instant 2-second alert escalation on thermal thresholds",
      "Battery life on edge sensor devices extended to 3+ years"
    ],
    technologies: ["Embedded C++", "Rust", "MQTT", "AWS IoT Core", "TimescaleDB", "Next.js"],
    year: "2024",
    featured: true
  },
  {
    id: "health-telemedicine",
    slug: "ai-diagnostics-telemedicine-platform",
    title: "AI Diagnostics & Telemedicine Ecosystem",
    client: "AuraCare Health",
    category: "HealthTech",
    tagline: "HIPAA-compliant diagnostic triage and remote patient consultation engine.",
    metric: "4.8x",
    metricLabel: "Faster Diagnostic Triage",
    image: "/works/health-telemedicine.png",
    summary: "Built an intelligent telehealth WebRTC application connecting patients with specialists, integrated with computer vision tools for automated medical scan preliminary review.",
    challenge: "Long patient wait times and overburdened clinic triage staff led to delays in critical specialist consultations.",
    solution: "Created an end-to-end encrypted telehealth portal featuring automated questionnaire triage, AI vision pre-screening, and HD video consultations.",
    results: [
      "Over 120,000 successful consultations conducted",
      "Average patient intake triage time reduced by 78%",
      "Achieved 98.6% positive patient satisfaction score"
    ],
    technologies: ["Next.js", "Python FastAPI", "PyTorch Vision", "WebRTC", "Tailwind CSS", "Docker"],
    year: "2025",
    featured: false
  },
  {
    id: "ecom-ai",
    slug: "ai-personalization-dynamic-storefront",
    title: "AI Personalization & Dynamic Commerce Engine",
    client: "LuxeVibe E-Commerce",
    category: "FinTech & E-Commerce",
    tagline: "Headless commerce architecture with real-time vector recommendation engine.",
    metric: "+38%",
    metricLabel: "Conversion Rate Uplift",
    image: "/works/ecom-ai.png",
    summary: "Developed a ultra-fast Next.js store with an integrated real-time vector recommendation algorithm that curates customized storefront layouts for every shopper.",
    challenge: "Low conversion rates and high bounce rates on generic product collection pages.",
    solution: "Engineered sub-50ms page renders powered by Next.js App Router, edge caching, and real-time behavioral embeddings.",
    results: [
      "Average Order Value (AOV) increased by 27%",
      "Page load speed optimized under 0.6 seconds globally",
      "38% increase in overall checkout conversion rate"
    ],
    technologies: ["Next.js", "Pinecone Vector DB", "Shopify Storefront API", "GSAP", "Vercel Edge"],
    year: "2024",
    featured: false
  }
];

export const projectCategories = [
  "All",
  "Media & Streaming",
  "AI & Automation",
  "Enterprise & Cloud",
  "IoT & Hardware",
  "HealthTech",
  "FinTech & E-Commerce"
] as const;
