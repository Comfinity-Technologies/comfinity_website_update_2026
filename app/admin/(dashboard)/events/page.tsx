import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { CalendarDays } from "lucide-react";

const UPCOMING_EVENTS = [
  { title: "Next-Gen Edge Intelligence Summit", date: "Oct 14, 2026", location: "Bangalore / Hybrid", seats: "150 RSVP" },
  { title: "Enterprise AI Architecture Deep-Dive", date: "Nov 02, 2026", location: "Virtual Webinar", seats: "320 RSVP" },
];

export default function EventsAdmin() {
  return (
    <AdminModuleScaffold
      title="Events"
      category="Ecosystem"
      description="Manage upcoming conferences, live webinars, tech workshops, and attendee RSVP lists."
      icon={CalendarDays}
      stats={[
        { label: "Upcoming Events", value: UPCOMING_EVENTS.length },
        { label: "Total Registrations", value: "470+", subtext: "Across upcoming" },
        { label: "Past Events", value: "18", subtext: "Archived with recordings" },
        { label: "Registration Mode", value: "Direct RSVP", subtext: "Email confirmed" },
      ]}
    >
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Upcoming Events Schedule</h3>
          <span className="text-xs text-neutral-500 font-mono">2 events scheduled</span>
        </div>
        <div className="divide-y divide-neutral-800/60">
          {UPCOMING_EVENTS.map((evt) => (
            <div key={evt.title} className="px-5 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition">
              <div>
                <p className="text-sm font-medium text-white">{evt.title}</p>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">{evt.date} · {evt.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {evt.seats}
                </span>
                <button className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded-lg px-3 py-1.5 transition">
                  Manage Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminModuleScaffold>
  );
}
