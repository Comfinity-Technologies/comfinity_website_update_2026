import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #4f7cff 0%, #a78bfa 60%, transparent 100%)",
        }}
      />
      <p className="font-display relative text-[26vw] font-bold leading-none text-watermark md:text-[16rem]">
        404
      </p>
      <h1 className="font-display relative -mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:-mt-16 md:text-5xl">
        This page got lost in the{" "}
        <span className="font-serif-accent text-gradient">innovation maze.</span>
      </h1>
      <p className="relative mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
        It happens. The page you&rsquo;re looking for doesn&rsquo;t exist — or
        has moved to a better address.
      </p>
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Go to Homepage
        </Link>
        <Link href="/solutions" className="btn-ghost">
          Explore Our Work
        </Link>
        <Link href="/contact" className="btn-ghost">
          Contact the Team
        </Link>
      </div>
    </main>
  );
}
