"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const THEME_EVENT = "comfinity-themechange";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark" as Theme);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      {/* sun (shown in dark mode → switches to light) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={`h-[18px] w-[18px] ${theme === "light" ? "hidden" : ""}`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
      {/* moon (shown in light mode → switches to dark) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-[18px] w-[18px] ${theme === "light" ? "" : "hidden"}`}
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
