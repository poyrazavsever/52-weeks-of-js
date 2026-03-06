import Link from "next/link";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "poyraz-ui/atoms";
import type { Phase } from "@/lib/api";

interface PhasesGridProps {
  phases: Phase[];
}

export default function PhasesGrid({ phases }: PhasesGridProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {phases.map((phase) => (
            <Card
              key={phase.slug}
              variant="bordered"
              className="transition-colors hover:bg-gray-50"
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{phase.title}</CardTitle>
                  <p className="text-xs text-gray-600">
                    Phase {phase.number} • {phase.weeks.length} Weeks
                  </p>
                </div>
                <Badge className="h-10 min-w-10 justify-center rounded-sm text-base">
                  {phase.number}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  {phase.weeks.slice(0, 5).map((week) => (
                    <Link
                      key={week.slug}
                      href={`/${phase.slug}/${week.slug}`}
                      className="block border-b border-dashed border-gray-200 py-1 text-xs text-gray-700 transition-colors hover:text-red-600"
                    >
                      <span className="font-mono text-[0.65rem] text-gray-500">
                        Week {week.number.toString().padStart(2, "0")}
                      </span>{" "}
                      • {week.title}
                    </Link>
                  ))}
                  {phase.weeks.length > 5 && (
                    <p className="pt-1.5 text-[0.65rem] text-gray-500">
                      +{phase.weeks.length - 5} more weeks
                    </p>
                  )}
                </div>

                <Link
                  href={`/${phase.slug}`}
                  className="inline-block text-xs font-semibold text-red-600 transition-colors hover:text-red-700"
                >
                  View all weeks →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
