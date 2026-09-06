import { readCareers } from "./_helpers"
import { saveCareersData } from "./_actions"

export default function CareersAdminPage() {
  const data = readCareers()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">Admin / Careers</p>
        <h1 className="text-2xl font-semibold text-white">Careers Content</h1>
        <p className="text-sm text-neutral-500 mt-1">Edit the content shown on the /careers page.</p>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-4 mb-6 text-xs text-neutral-500">
        <strong className="text-neutral-400">Format guide:</strong>
        <ul className="mt-1 space-y-0.5 list-disc list-inside">
          <li><strong>Looking For:</strong> one item per line</li>
          <li><strong>Offers &amp; Programs:</strong> <code className="bg-neutral-800 px-1 rounded">Title | Description</code> — one per line</li>
        </ul>
      </div>

      <form action={saveCareersData} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-neutral-400">Who We Are Looking For (one per line)</label>
          <textarea name="lookingFor" rows={6} defaultValue={data.lookingFor.join("\n")} className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition" />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-neutral-400">What We Offer (Title | Description per line)</label>
          <textarea name="offers" rows={8} defaultValue={data.offers.map((o: { t: string; d: string }) => `${o.t} | ${o.d}`).join("\n")} className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition" />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-neutral-400">Student Programs (Title | Description per line)</label>
          <textarea name="studentPrograms" rows={6} defaultValue={data.studentPrograms.map((p: { t: string; d: string }) => `${p.t} | ${p.d}`).join("\n")} className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition" />
        </div>
        <div className="pt-2">
          <button type="submit" className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition">Save Changes</button>
        </div>
      </form>
    </div>
  )
}