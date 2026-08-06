import Image from "next/image";
import Reveal from "../anim/Reveal";
import TextReveal from "../anim/TextReveal";

const clientReviews = [
  {
    name: "Ajay",
    org: "REPZ Platform",
    avatar: "/reviews/ajay.png",
    stars: 5,
    quote:
      "Managing our gym used to be super fragmented. REPZ brought everything into one platform, giving us complete visibility and our members love it!",
  },
  {
    name: "Sreejith",
    org: "Minute Bazaar",
    avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027075/WhatsApp_Image_2026-08-06_at_4.18.10_PM_u8l7va.jpg",
    stars: 5,
    quote:
      "Going online was so easy with them! Order management and delivery run smoothly every single day, and customer satisfaction has skyrocketed.",
  },
  {
    name: "Vignesh",
    org: "Fliqket OTT",
    avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027078/Gemini_Generated_Image_bay672bay672bay6_lp8sgz.png",
    stars: 5,
    quote:
      "What impressed us most was Fliqket's creator-first approach. From secure streaming to analytics, it gave us all the tools to build a real digital business.",
  },
  {
    name: "Aravind",
    org: "Retail Marketplace",
    avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027076/WhatsApp_Image_2026-08-06_at_4.02.11_PM_p21bfa.jpg",
    stars: 5,
    quote:
      "Comfinity helped transform our grocery business into a modern digital marketplace. Their team truly understood our vision and made everything effortless.",
  },
  {
    name: "Sujin",
    org: "Medicharm Pharma",
    avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027872/Gemini_Generated_Image_jat3b3jat3b3jat3_mojez2.png",
    stars: 5,
    quote:
      "Managing batch inventory across pharmacy branches used to be really chaotic. Their system gave us complete, real-time sync across all locations.",
  },
  {
    name: "Arun",
    org: "Reztos Restaurant OS",
    avatar: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786027076/Gemini_Generated_Image_rbbntzrbbntzrbbn_wfwyi5.png",
    stars: 5,
    quote:
      "Reztos made running our restaurant so much easier — QR ordering, kitchen billing, and multi-outlet management all in one smooth platform.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 md:py-32">
      <p className="section-label mb-4 text-center text-blue-400 font-mono tracking-widest uppercase">
        Client Reviews
      </p>
      <TextReveal
        as="h2"
        className="font-display mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight md:text-5xl mb-16"
      >
        What our clients{" "}
        <span className="font-serif-accent text-gradient bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          say about us.
        </span>
      </TextReveal>

      {/* Top-to-bottom vertical zigzag stream (one by one alternating left/right) */}
      <Reveal stagger={0.12} className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
        {clientReviews.map((review, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={review.name}
              className={`client-review-card flex flex-col items-center gap-6 p-6 sm:p-8 rounded-[36px] bg-gradient-to-br from-[#0c162c] via-[#142347] to-[#091122] border border-blue-500/30 hover:border-blue-400/70 shadow-[0_8px_28px_rgba(37,99,235,0.22)] hover:shadow-[0_14px_36px_rgba(59,130,246,0.38)] transition-all duration-300 group ${
                isEven
                  ? "sm:flex-row text-left self-start sm:w-[92%]"
                  : "sm:flex-row-reverse text-right self-end sm:w-[92%]"
              }`}
            >
              {/* Avatar & Name Column */}
              <div className="flex flex-col items-center shrink-0 w-24 sm:w-28 text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300 bg-blue-950/40">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2.5 text-sm font-semibold text-blue-100 tracking-wide font-sans">
                  {review.name}
                </span>
                <span className="text-[10px] text-blue-400/90 font-mono tracking-wider uppercase mt-0.5">
                  {review.org}
                </span>
              </div>

              {/* Stars & Quote Column */}
              <div
                className={`flex-1 flex flex-col items-center justify-center ${
                  isEven ? "sm:items-start text-left" : "sm:items-end text-right"
                }`}
              >
                {/* 5 Yellow Stars */}
                <div className="flex gap-1 text-amber-400 text-sm md:text-base mb-3 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                  {"★".repeat(review.stars)}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-blue-100/95 leading-relaxed font-sans font-normal tracking-wide">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}


