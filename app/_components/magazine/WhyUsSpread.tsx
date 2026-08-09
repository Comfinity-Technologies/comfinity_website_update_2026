import React from 'react'
import { WhyUsPage } from './WhyUsPage'
import { ClientReviewsPage } from './ClientReviewsPage'

export function WhyUsSpread() {
  return (
    <div className="w-full max-w-6xl mx-auto my-6 p-3 sm:p-6 bg-surface-2 rounded-2xl border border-line shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 bg-[#fbfaf7] dark:bg-[#12141b] rounded-xl overflow-hidden border border-line text-[#14171f] dark:text-[#eef0f4] relative shadow-lg">
        {/* Middle spine shadow crease for 3D magazine spread effect */}
        <div
          className="hidden lg:block absolute inset-y-0 left-1/2 -ml-[15px] w-[30px] pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0.03) 40%, rgba(0,0,0,0.03) 60%, rgba(0,0,0,0.12))',
          }}
        />

        {/* LEFT PAGE — FOLIO 4: WHY US */}
        <div className="relative p-2 sm:p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line/40">
          <WhyUsPage />
        </div>

        {/* RIGHT PAGE — FOLIO 5: CLIENT REVIEWS */}
        <div className="relative p-2 sm:p-4 flex flex-col justify-between">
          <ClientReviewsPage />
        </div>
      </div>
    </div>
  )
}
