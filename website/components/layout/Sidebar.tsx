"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Badge } from "poyraz-ui/atoms";
import type { Phase } from "@/lib/api";

interface SidebarProps {
  phases: Phase[];
  currentPhase?: string;
  currentWeek?: string;
}

interface SidebarTreeProps extends SidebarProps {
  expandedPhases: Record<string, boolean>;
  onTogglePhase: (phaseSlug: string) => void;
  onNavigate: () => void;
  mobile?: boolean;
}

function SidebarTree({
  phases,
  currentPhase,
  currentWeek,
  expandedPhases,
  onTogglePhase,
  onNavigate,
  mobile = false,
}: SidebarTreeProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4">
        <nav className="space-y-5" aria-label="Sidebar navigation">
          {phases.map((phase) => {
            const isExpanded = expandedPhases[phase.slug];
            const isCurrentPhase = currentPhase === phase.slug;

            return (
              <section key={phase.slug} className="space-y-2">
                <button
                  onClick={() => onTogglePhase(phase.slug)}
                  className={`flex w-full items-center justify-between rounded-sm px-2 py-2 text-left transition-colors ${
                    isCurrentPhase
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-expanded={isExpanded}
                >
                  <span className="flex items-center gap-2 overflow-hidden">
                    <Badge className="min-w-5 justify-center px-1 py-0 text-[10px]">
                      {phase.number}
                    </Badge>
                    <span className="truncate text-xs font-semibold tracking-wide">
                      {phase.title}
                    </span>
                  </span>
                  <Icon
                    icon={isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
                    className="text-base text-slate-500"
                  />
                </button>

                {isExpanded && (
                  <div className="space-y-0.5 pl-1">
                    {phase.weeks.map((week) => {
                      const isActive = currentWeek === week.slug;
                      return (
                        <Link
                          key={week.slug}
                          href={`/${phase.slug}/${week.slug}`}
                          onClick={onNavigate}
                          className={`flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors ${
                            isActive
                              ? "bg-red-50 text-red-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="w-6 shrink-0 text-[10px] font-mono text-slate-400">
                            {week.number.toString().padStart(2, "0")}
                          </span>
                          <span className="truncate">{week.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        {mobile ? (
          <div className="space-y-1 text-xs">
            <Link
              href="/"
              onClick={onNavigate}
              className="block rounded-sm px-2 py-1.5 text-slate-600 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/resources"
              onClick={onNavigate}
              className="block rounded-sm px-2 py-1.5 text-slate-600 hover:bg-slate-50"
            >
              Resources
            </Link>
            <Link
              href="/extra"
              onClick={onNavigate}
              className="block rounded-sm px-2 py-1.5 text-slate-600 hover:bg-slate-50"
            >
              Extra & The Lab
            </Link>
          </div>
        ) : (
          <Link
            href="/"
            onClick={onNavigate}
            className="block rounded-sm px-2 py-1.5 text-xs font-semibold tracking-wide text-slate-600 hover:bg-slate-50"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({
  phases,
  currentPhase,
  currentWeek,
}: SidebarProps) {
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      if (currentPhase) initial[currentPhase] = true;
      return initial;
    },
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleTogglePhase = (phaseSlug: string) => {
    setExpandedPhases((prev) => {
      const nextOpen = !prev[phaseSlug];
      if (!nextOpen) return {};
      return { [phaseSlug]: true };
    });
  };

  const handleNavigate = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-sm border border-white/30 bg-red-600 text-white shadow-lg lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Icon
          icon={isMobileOpen ? "mdi:close" : "mdi:menu"}
          className="text-xl"
        />
      </button>

      <aside className="fixed left-0 top-23 z-30 hidden h-[calc(100vh-5.75rem)] w-72 border-r border-slate-200 bg-white lg:block">
        <SidebarTree
          phases={phases}
          currentPhase={currentPhase}
          currentWeek={currentWeek}
          expandedPhases={expandedPhases}
          onTogglePhase={handleTogglePhase}
          onNavigate={handleNavigate}
        />
      </aside>

      {isMobileOpen && (
        <>
          <div
            onClick={handleNavigate}
            className="fixed inset-0 top-23 z-40 bg-black/40 lg:hidden"
          />
          <aside className="fixed left-0 top-23 z-50 h-[calc(100vh-5.75rem)] w-72 border-r border-slate-200 bg-white lg:hidden">
            <SidebarTree
              phases={phases}
              currentPhase={currentPhase}
              currentWeek={currentWeek}
              expandedPhases={expandedPhases}
              onTogglePhase={handleTogglePhase}
              onNavigate={handleNavigate}
              mobile
            />
          </aside>
        </>
      )}
    </>
  );
}
