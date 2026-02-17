import Link from "next/link";
import type { Phase } from "@/lib/api";

interface PhasesGridProps {
  phases: Phase[];
}

export default function PhasesGrid({ phases }: PhasesGridProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {phases.map((phase) => (
            <div
              key={phase.slug}
              className="border-2 border-dashed border-gray-900 p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1.5">
                    {phase.title}
                  </h2>
                  <p className="text-xs text-gray-600">
                    Phase {phase.number} • {phase.weeks.length} Weeks
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center text-white font-semibold text-base">
                  {phase.number}
                </div>
              </div>

              {/* Week List */}
              <div className="space-y-1.5 mb-3">
                {phase.weeks.slice(0, 5).map((week) => (
                  <Link
                    key={week.slug}
                    href={`/${phase.slug}/${week.slug}`}
                    className="block text-xs text-gray-700 hover:text-red-600 transition-colors py-1 border-b border-dashed border-gray-200"
                  >
                    <span className="font-mono text-[0.65rem] text-gray-500">
                      Week {week.number.toString().padStart(2, "0")}
                    </span>{" "}
                    • {week.title}
                  </Link>
                ))}
                {phase.weeks.length > 5 && (
                  <p className="text-[0.65rem] text-gray-500 pt-1.5">
                    +{phase.weeks.length - 5} more weeks
                  </p>
                )}
              </div>

              {/* View All Link */}
              <Link
                href={`/${phase.slug}`}
                className="inline-block text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                View all weeks →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
