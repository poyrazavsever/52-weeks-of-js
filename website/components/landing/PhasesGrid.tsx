import Link from "next/link";
import type { Phase } from "@/lib/api";

interface PhasesGridProps {
  phases: Phase[];
}

export default function PhasesGrid({ phases }: PhasesGridProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {phases.map((phase) => (
            <div
              key={phase.slug}
              className="border-2 border-dashed border-gray-900 p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {phase.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Phase {phase.number} • {phase.weeks.length} Weeks
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white font-bold text-xl">
                  {phase.number}
                </div>
              </div>

              {/* Week List */}
              <div className="space-y-2 mb-4">
                {phase.weeks.slice(0, 5).map((week) => (
                  <Link
                    key={week.slug}
                    href={`/${phase.slug}/${week.slug}`}
                    className="block text-sm text-gray-700 hover:text-red-600 transition-colors py-1 border-b border-dashed border-gray-200"
                  >
                    <span className="font-mono text-xs text-gray-500">
                      Week {week.number.toString().padStart(2, "0")}
                    </span>{" "}
                    • {week.title}
                  </Link>
                ))}
                {phase.weeks.length > 5 && (
                  <p className="text-xs text-gray-500 pt-2">
                    +{phase.weeks.length - 5} more weeks
                  </p>
                )}
              </div>

              {/* View All Link */}
              <Link
                href={`/${phase.slug}`}
                className="inline-block text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
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
