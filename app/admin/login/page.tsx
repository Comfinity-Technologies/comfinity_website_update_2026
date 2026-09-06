"use client";

import { useActionState } from "react";
import { loginAdmin, type AuthState } from "@/app/actions/admin-auth";

const initial: AuthState = {};

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAdmin, initial);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Comfinity Technologies
          </p>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Admin Panel
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Sign in to manage your website
          </p>
        </div>

        <form action={action} className="space-y-4">
          {state.error && (
            <div className="rounded-lg bg-red-900/30 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-neutral-400"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@comfinityindia.com"
              className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-neutral-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-white text-black font-medium text-sm py-3 hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-600 mt-8">
          This area is restricted to authorized Comfinity administrators.
        </p>
      </div>
    </div>
  );
}
