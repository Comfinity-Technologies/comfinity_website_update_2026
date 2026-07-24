import Image from "next/image";
import Marquee from "./anim/Marquee";

type LogoItem = {
  name: string;
  /** Small caption, e.g. "Sponsor" / "Technology Partner". */
  role?: string;
  href?: string;
  /** Real logo asset; `srcDark` swaps in on the dark theme. */
  img?: {
    src: string;
    srcDark?: string;
    width: number;
    height: number;
    showName?: boolean;
  };
};

const logos: LogoItem[] = [
  {
    name: "GATES",
    role: "Sponsor",
    // Wordmark is part of the image, so the name text stays hidden.
    img: {
      src: "/sponsors/gates.png",
      srcDark: "/sponsors/gates-dark.png",
      width: 700,
      height: 156,
    },
  },
  {
    name: "IIT Madras",
    role: "Sponsor",
    img: { src: "/sponsors/iitm.png", width: 317, height: 316, showName: true },
  },
  {
    name: "thegr8labs",
    role: "Technology Partner",
    href: "https://thegr8labs.com",
  },
];

/* Marquee only duplicates its children once; with three logos each half
   would be narrower than the viewport and the loop would show a gap,
   so repeat the set a few times per half. */
const REPEAT = 3;
const track = Array.from({ length: REPEAT }, () => logos).flat();

type Props = {
  duration?: string;
  className?: string;
};

/**
 * Auto-scrolling partner/sponsor logo carousel — right to left, infinite,
 * full colour. Reusable on any page.
 */
export default function LogoCarousel({ duration = "32s", className = "" }: Props) {
  return (
    <Marquee duration={duration} className={className}>
      {track.map((logo, i) => {
        const Tag = logo.href ? "a" : "span";
        return (
          <Tag
            key={`${logo.name}-${i}`}
            {...(logo.href
              ? { href: logo.href, target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex items-center gap-3 px-8 py-2 md:px-11"
          >
            {logo.img && (
              <>
                <Image
                  src={logo.img.srcDark ?? logo.img.src}
                  alt={`${logo.name} logo`}
                  width={logo.img.width}
                  height={logo.img.height}
                  className={`h-8 w-auto md:h-9 ${logo.img.srcDark ? "logo-dark" : ""}`}
                />
                {logo.img.srcDark && (
                  <Image
                    src={logo.img.src}
                    alt={`${logo.name} logo`}
                    width={logo.img.width}
                    height={logo.img.height}
                    className="logo-light h-8 w-auto md:h-9"
                  />
                )}
              </>
            )}
            <span className="flex flex-col items-start">
              {(!logo.img || logo.img.showName) && (
                <span className="font-display whitespace-nowrap text-lg font-semibold leading-tight tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground md:text-xl">
                  {logo.name}
                </span>
              )}
              {logo.role && (
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                  {logo.role}
                </span>
              )}
            </span>
          </Tag>
        );
      })}
    </Marquee>
  );
}
