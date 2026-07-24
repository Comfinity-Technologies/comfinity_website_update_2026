import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  duration?: string;
  className?: string;
};

/** CSS-driven infinite marquee. Children are rendered twice for a seamless loop. */
export default function Marquee({
  children,
  duration = "40s",
  className = "",
}: Props) {
  return (
    <div className={`overflow-hidden mask-fade-x ${className}`}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
