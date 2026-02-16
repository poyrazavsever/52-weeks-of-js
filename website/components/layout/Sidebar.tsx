"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import type { Phase } from "@/lib/api";

interface SidebarProps {
  phases: Phase[];
  currentPhase?: string;
  currentWeek?: string;
}

export default function Sidebar({
  phases,
  currentPhase,
  currentWeek,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(
    () => {
      // Auto-expand current phase
      const initial: Record<string, boolean> = {};
      if (currentPhase) {
        initial[currentPhase] = true;
      }
      return initial;
    },
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const togglePhase = (phaseSlug: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseSlug]: !prev[phaseSlug],
    }));
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b-2 border-dashed border-gray-200">
        <h2 className="font-bold text-gray-900 text-sm">Navigation</h2>
      </div>

      {/* Navigation Tree */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {phases.map((phase) => {
          const isExpanded = expandedPhases[phase.slug];
          const isCurrentPhase = currentPhase === phase.slug;

          return (
            <div key={phase.slug} className="space-y-1">
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold transition-colors border-2 border-dashed ${
                  isCurrentPhase
                    ? "bg-red-50 border-red-600 text-red-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold">
                    {phase.number}
                  </span>
                  <span className="truncate">{phase.title}</span>
                </div>
                <Icon
                  icon={isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
                  className="text-lg shrink-0"
                />
              </button>

              {/* Weeks List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 space-y-1 pt-1">
                      {phase.weeks.map((week) => {
                        const isActive = currentWeek === week.slug;
                        const weekPath = `/${phase.slug}/${week.slug}`;

                        return (
                          <Link
                            key={week.slug}
                            href={weekPath}
                            onClick={() => setIsMobileOpen(false)}
                            className={`block px-3 py-2 text-sm transition-colors border-l-2 ${
                              isActive
                                ? "border-red-600 bg-red-50 text-red-900 font-semibold"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs">
                                {week.number.toString().padStart(2, "0")}
                              </span>
                              <span className="truncate">{week.title}</span>
                            </div>
                            {isActive && (
                              <div className="flex gap-2 mt-1">
                                {week.hasLab && (
                                  <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 border border-green-300">
                                    Lab
                                  </span>
                                )}
                                {week.hasNotes && (
                                  <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 border border-blue-300">
                                    Notes
                                  </span>
                                )}
                              </div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-dashed border-gray-200">
        <Link
          href="/"
          className="block text-sm text-red-600 hover:text-red-700 font-semibold transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-dashed border-white/30"
        aria-label="Toggle sidebar"
      >
        <Icon
          icon={isMobileOpen ? "mdi:close" : "mdi:menu"}
          className="text-2xl"
        />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 h-screen sticky top-0 bg-white border-r-2 border-dashed border-gray-200">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="lg:hidden fixed top-0 left-0 w-80 h-screen bg-white border-r-2 border-dashed border-gray-200 z-50 overflow-hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
