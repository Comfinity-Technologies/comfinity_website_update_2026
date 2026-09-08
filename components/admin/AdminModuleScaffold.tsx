import Link from "next/link";
import { LucideIcon, ExternalLink, Plus, Sparkles, Database, Layers, CheckCircle2 } from "lucide-react";

interface AdminModuleScaffoldProps {
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  liveUrl?: string;
  stats?: Array<{ label: string; value: string | number; subtext?: string }>;
  children?: React.ReactNode;
}

export function AdminModuleScaffold({
  title,
  category,
  description,
  icon: Icon,
  badge = "CMS Module",
  liveUrl,
  stats,
  children,
}: AdminModuleScaffoldProps) {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start md:items-end justify-between border-b border-neutral-800/80 pb-6 flex-col md:flex-row gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Admin / {category}
            </span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {badge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
              <p className="text-sm text-neutral-400 mt-0.5 max-w-2xl">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 bg-neutral-900/80 rounded-lg px-3.5 py-2 transition flex items-center gap-1.5"
            >
              <span>View on Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          )}

          <button
            type="button"
            className="text-xs bg-white text-black font-medium px-3.5 py-2 rounded-lg hover:bg-neutral-200 transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {/* Stats row if provided */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-neutral-900/70 border border-neutral-800/80 p-4 flex flex-col justify-between"
            >
              <p className="text-[11px] text-neutral-500 uppercase font-mono tracking-wider">
                {s.label}
              </p>
              <div className="my-2">
                <p className="text-2xl font-bold text-white tracking-tight">{s.value}</p>
                {s.subtext && <p className="text-xs text-neutral-400 mt-0.5">{s.subtext}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content body / children */}
      {children ? (
        children
      ) : (
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-8 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-800/60 border border-neutral-700/50 flex items-center justify-center text-amber-400">
            <Icon className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-medium text-white">{title} Management</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This module is registered in the Comfinity admin hierarchy. Connect dynamic content models,
              asset storage, and schema handlers to enable live editing.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-800/60 border border-neutral-700/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Route Active
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-800/60 border border-neutral-700/40 px-3 py-1.5 rounded-lg">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              JSON Data Store Compatible
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
