"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AppDrawerItem = {
  id: string;
  title: string;
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

type Props = {
  apps: AppDrawerItem[];
  className?: string;
};

export function AppDrawer({ apps, className }: Props) {
  return (
    <div className={cn("pointer-events-none fixed inset-x-0 bottom-4 z-[9999] flex justify-center px-4", className)}>
      <div className="pointer-events-auto flex items-end gap-2 rounded-2xl border border-white/15 bg-zinc-900/45 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={app.onClick}
            aria-label={app.title}
            title={app.title}
            className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-700/40 text-slate-100 transition-transform duration-150 hover:scale-110 hover:bg-zinc-600/55 active:scale-95"
          >
            <span className="text-xl leading-none">{app.icon}</span>
            <span
              className={cn(
                "absolute -bottom-2 h-1.5 w-1.5 rounded-full bg-zinc-400 transition-opacity",
                app.isActive ? "opacity-100" : "opacity-0"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
