import type { Metadata } from 'next'
import PageHero from '@/app/_components/PageHero'
import CtaBand from '@/app/_components/CtaBand'
import { WhyUsSpread } from '@/app/_components/magazine/WhyUsSpread'

export const metadata: Metadata = {
  title: 'Why Us — Comfinity Technologies',
  description:
    'Discover the Comfinity Edge: Business-First thinking, Digital Engineering, AI Automation, and industry-empowering solutions.',
}

export default function WhyUs() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHero
        label="The Comfinity Edge"
        title={
          <>
            Why <span className="font-serif-accent text-gradient">us.</span>
          </>
        }
        body="Business-first technology solutions, intelligent engineering, and end-to-end partnership driving real innovation."
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <WhyUsSpread />
      </section>

      <CtaBand />
    </main>
  )
}
