import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhases } from "@/lib/api";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

type PageProps = {
  params: Promise<{
    phase: string;
  }>;
};

// Generate static params for all phases
export async function generateStaticParams() {
  const phases = getPhases();
  return phases.map((phase) => ({
    phase: phase.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { phase } = await params;
  const phases = getPhases();
  const currentPhase = phases.find((p) => p.slug === phase);

  if (!currentPhase) {
    return {
      title: "Phase Not Found",
    };
  }

  return {
    title: `${currentPhase.title} | 52 Weeks of JavaScript`,
    description: `Phase ${currentPhase.number}: ${currentPhase.weeks.length} weeks of intensive learning`,
  };
}

export default async function PhasePage({ params }: PageProps) {
  const { phase } = await params;
  const phases = getPhases();
  const currentPhase = phases.find((p) => p.slug === phase);

  if (!currentPhase) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs phase={phase} />

          {/* Header */}
          <header className="mb-12 border-b-2 border-dashed border-gray-200 pb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {currentPhase.title}
                </h1>
                <p className="text-gray-600">
                  Phase {currentPhase.number} • {currentPhase.weeks.length}{" "}
                  Weeks of Intensive Learning
                </p>
              </div>
              <div className="w-16 h-16 bg-red-600 flex items-center justify-center text-white font-bold text-2xl">
                {currentPhase.number}
              </div>
            </div>
          </header>

          {/* Weeks List */}
          <div className="space-y-4">
            {currentPhase.weeks.map((week) => (
              <Link
                key={week.slug}
                href={`/${phase}/${week.slug}`}
                className="block border-2 border-dashed border-gray-300 hover:border-red-600 transition-colors p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono font-semibold text-red-600">
                        Week {week.number.toString().padStart(2, "0")}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900">
                        {week.title}
                      </h2>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-600">
                      {week.hasLab && (
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Lab Available
                        </span>
                      )}
                      {week.hasNotes && (
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Notes Available
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation */}
          <nav className="mt-12 pt-8 border-t-2 border-dashed border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-semibold"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to all phases
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
