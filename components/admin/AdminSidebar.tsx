"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Globe,
  FileText,
  Layers,
  Menu,
  Sliders,
  Rocket,
  Briefcase,
  BarChart3,
  Users,
  Handshake,
  Star,
  Camera,
  Image as ImageIcon,
  Sparkles,
  Calendar,
  Video,
  FlaskConical,
  Globe2,
  CalendarDays,
  BriefcaseBusiness,
  Inbox,
  Search,
  Settings,
  UserCog,
  ScrollText,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LogOut,
  GitPullRequest,
  Building2,
  MessageSquareQuote,
  ShieldCheck,
  FolderKanban,
  GraduationCap,
  FileCode,
  Tag,
  KeyRound,
  X,
} from "lucide-react";
import { logoutAdmin } from "@/app/actions/admin-auth";

interface AdminSidebarProps {
  session: {
    email: string;
  };
  unreadCount: number;
}

interface NavSubItem {
  label: string;
  href: string;
  icon?: any;
  badge?: string;
}

interface NavSection {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: number | string;
  items?: NavSubItem[];
}

export function AdminSidebar({ session, unreadCount }: AdminSidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    website: false,
    products: false,
    solutions: false,
    people: false,
    media: false,
    socialProof: false,
    community: false,
    careers: false,
    leads: false,
    seo: false,
    navigation: false,
    settings: false,
    users: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 13 Enterprise Navigation Sections
  const navSections: NavSection[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
      },
      {
        id: "website",
        label: "Website Content",
        icon: Globe,
        items: [
          { label: "Homepage", href: "/admin/website/homepage", icon: Layers },
          { label: "Pages Overview", href: "/admin/website/pages", icon: FileText },
          { label: "Our Story", href: "/about/story", icon: FileText },
          { label: "Mission & Values", href: "/about/mission", icon: FileText },
          { label: "Divisions", href: "/about/divisions", icon: Building2 },
          { label: "Leadership", href: "/admin/people", icon: Users },
          { label: "Solutions", href: "/admin/solutions", icon: Briefcase },
          { label: "Labs", href: "/admin/labs", icon: FlaskConical },
          { label: "Partners", href: "/admin/partners", icon: Handshake },
          { label: "Community", href: "/admin/community", icon: Globe2 },
          { label: "Careers", href: "/admin/careers", icon: BriefcaseBusiness },
          { label: "Contact", href: "/admin/contacts", icon: Inbox },
        ],
      },
      {
        id: "products",
        label: "Products",
        icon: Rocket,
        items: [
          { label: "Products Catalog", href: "/admin/products", icon: Rocket },
          { label: "Product Roadmap", href: "/admin/products/roadmap", icon: GitPullRequest },
          { label: "Product Magazine", href: "/admin/magazine", icon: FileText },
          { label: "Categories", href: "/admin/products", icon: Tag },
        ],
      },
      {
        id: "solutions",
        label: "Solutions",
        icon: Briefcase,
        items: [
          { label: "Services & Offerings", href: "/admin/solutions", icon: Briefcase },
          { label: "Industries CMS", href: "/admin/solutions/industries", icon: Building2 },
          { label: "Case Studies", href: "/admin/projects", icon: FolderKanban },
        ],
      },
      {
        id: "people",
        label: "People",
        icon: Users,
        items: [
          { label: "Leadership", href: "/admin/people", icon: Users },
          { label: "Team Members", href: "/admin/people", icon: Users },
          { label: "Advisors", href: "/admin/people", icon: ShieldCheck },
        ],
      },
      {
        id: "media",
        label: "Media Library",
        icon: Camera,
        items: [
          { label: "Company Photos", href: "/admin/media/photos", icon: ImageIcon },
          { label: "Culture Photos", href: "/admin/media/culture", icon: Sparkles },
          { label: "Event Photos", href: "/admin/media/events", icon: Calendar },
          { label: "Videos", href: "/admin/media/videos", icon: Video },
          { label: "Documents & RFPs", href: "/admin/media/documents", icon: FileText },
        ],
      },
      {
        id: "socialProof",
        label: "Social Proof",
        icon: Star,
        items: [
          { label: "Google Reviews", href: "/admin/social-proof/google-reviews", icon: Star },
          { label: "Client Testimonials", href: "/admin/social-proof/testimonials", icon: MessageSquareQuote },
          { label: "Partners & Sponsors", href: "/admin/partners", icon: Handshake },
          { label: "Recognition", href: "/admin/social-proof", icon: ShieldCheck },
        ],
      },
      {
        id: "community",
        label: "Community",
        icon: Globe2,
        items: [
          { label: "Programs", href: "/admin/community", icon: Globe2 },
          { label: "Events & Summits", href: "/admin/events", icon: CalendarDays },
          { label: "Student Ambassadors", href: "/admin/community", icon: GraduationCap },
        ],
      },
      {
        id: "careers",
        label: "Careers",
        icon: GraduationCap,
        items: [
          { label: "Job Openings", href: "/admin/careers", icon: BriefcaseBusiness },
          { label: "Internships & Tracks", href: "/admin/careers", icon: GraduationCap },
          { label: "Candidate Applications", href: "/admin/contacts", icon: Inbox },
        ],
      },
      {
        id: "leads",
        label: "Leads & Enquiries",
        icon: Inbox,
        badge: unreadCount > 0 ? unreadCount : undefined,
        items: [
          { label: "All Enquiries", href: "/admin/contacts", icon: Inbox },
          { label: "Consultation Requests", href: "/admin/contacts", icon: Briefcase },
          { label: "Partnership Requests", href: "/admin/contacts", icon: Handshake },
          { label: "Career Applications", href: "/admin/contacts", icon: GraduationCap },
        ],
      },
      {
        id: "seo",
        label: "SEO & Metadata",
        icon: Search,
        items: [
          { label: "Meta & OG Cards", href: "/admin/seo", icon: Search },
          { label: "XML Sitemap", href: "/admin/seo", icon: FileCode },
        ],
      },
      {
        id: "navigation",
        label: "Navigation",
        icon: Menu,
        items: [
          { label: "Header Menu", href: "/admin/website/navigation", icon: Menu },
          { label: "Footer Links", href: "/admin/website/navigation", icon: Sliders },
          { label: "Global Content", href: "/admin/website/global", icon: Sliders },
        ],
      },
      {
        id: "settings",
        label: "Website Settings",
        icon: Settings,
        items: [
          { label: "General Settings", href: "/admin/settings", icon: Settings },
          { label: "Admin Users", href: "/admin/users", icon: UserCog },
          { label: "Activity Logs", href: "/admin/activity-logs", icon: ScrollText },
        ],
      },
    ],
    [unreadCount]
  );

  // Auto-expand accordion that contains the active route
  useEffect(() => {
    navSections.forEach((sec) => {
      if (sec.items?.some((item) => pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)))) {
        setOpenSections((prev) => ({ ...prev, [sec.id]: true }));
      }
    });
  }, [pathname, navSections]);

  const isLinkActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return navSections;
    const q = searchQuery.toLowerCase();
    return navSections
      .map((sec) => {
        const matchesSection = sec.label.toLowerCase().includes(q);
        const matchedItems = sec.items?.filter((item) => item.label.toLowerCase().includes(q));
        if (matchesSection || (matchedItems && matchedItems.length > 0)) {
          return {
            ...sec,
            items: matchedItems && matchedItems.length > 0 ? matchedItems : sec.items,
          };
        }
        return null;
      })
      .filter(Boolean) as NavSection[];
  }, [navSections, searchQuery]);

  return (
    <aside className="w-64 shrink-0 flex flex-col bg-[#0d0d0e] border-r border-neutral-800/90 h-screen select-none">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-800/90">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Comfinity
              </p>
            </div>
            <h1 className="text-sm font-semibold tracking-tight text-white">Admin Platform</h1>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span
                title={`${unreadCount} unread alert${unreadCount === 1 ? "" : "s"}`}
                className="flex h-2.5 w-2.5 relative"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Live Website"
              className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-1.5 rounded-md transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Search */}
        <div className="mt-3 relative">
          <Search className="w-3 h-3 text-neutral-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules..."
            className="w-full bg-neutral-900/90 border border-neutral-800 text-neutral-200 placeholder-neutral-500 text-[11px] rounded-lg pl-7 pr-7 py-1.5 focus:outline-none focus:border-amber-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2 text-neutral-500 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-xs">
        {filteredSections.map((sec) => {
          const Icon = sec.icon;
          const isSectionActive =
            (sec.href && isLinkActive(sec.href)) ||
            sec.items?.some((i) => isLinkActive(i.href));
          const isOpen = Boolean(searchQuery) || Boolean(openSections[sec.id]);

          // Single Link Section (e.g. Dashboard)
          if (!sec.items || sec.items.length === 0) {
            return (
              <Link
                key={sec.id}
                href={sec.href || "/admin"}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors group ${
                  isSectionActive
                    ? "bg-neutral-800 text-white font-medium border-l-2 border-amber-500 pl-2.5"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  <span>{sec.label}</span>
                </div>
                {sec.badge !== undefined && (
                  <span className="text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    {sec.badge}
                  </span>
                )}
              </Link>
            );
          }

          // Collapsible Accordion Section
          return (
            <div key={sec.id} className="space-y-0.5">
              <button
                type="button"
                onClick={() => toggleSection(sec.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors group cursor-pointer ${
                  isSectionActive && !isOpen
                    ? "bg-neutral-800/40 text-amber-300 font-medium"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  <span className="font-medium text-neutral-300 group-hover:text-white">
                    {sec.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {sec.badge !== undefined && (
                    <span className="text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded-full">
                      {sec.badge}
                    </span>
                  )}
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="pl-4 pr-1 py-0.5 space-y-0.5 border-l border-neutral-800/80 ml-4">
                  {sec.items.map((item) => {
                    const active = isLinkActive(item.href);
                    const SubIcon = item.icon || FileText;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          active
                            ? "bg-neutral-800 text-white font-medium border-l-2 border-amber-500 pl-2"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <SubIcon className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Account & Logout Footer */}
      <div className="px-4 py-3.5 border-t border-neutral-800/90 bg-neutral-950/60">
        <div className="flex items-center justify-between mb-2">
          <div className="truncate pr-2">
            <p className="text-[11px] font-medium text-neutral-300 truncate">
              {session.email}
            </p>
            <p className="text-[10px] text-neutral-500 font-mono">Super Admin</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 shrink-0" title="Session Active" />
        </div>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center justify-between text-xs text-neutral-400 hover:text-red-400 hover:bg-neutral-800/50 rounded-md px-2 py-1.5 transition-colors cursor-pointer"
          >
            <span>Sign out</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
}
