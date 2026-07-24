import LogoCarousel from "../LogoCarousel";
import SkewMarquee from "../anim/SkewMarquee";

export default function TrustBar() {
  return (
    <section className="border-b border-line py-10">
      <p className="section-label mb-8 text-center">
        Trusted across Southeast Asia and beyond
      </p>
      <SkewMarquee>
        <LogoCarousel duration="32s" />
      </SkewMarquee>
    </section>
  );
}
