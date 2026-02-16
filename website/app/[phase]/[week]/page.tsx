import { notFound } from "next/navigation";
import { getPhases, getWeekContent } from "@/lib/api";
import { parseMDX } from "@/lib/mdx";
import Sidebar from "@/components/layout/Sidebar";
import DayTabs from "@/components/shared/DayTabs";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

// Type for page params
type PageProps = {
  params: Promise<{
    phase: string;
    week: string;
  }>;
};

// Generate static params for all phase/week combinations
export async function generateStaticParams() {
  const phases = getPhases();
  const params: { phase: string; week: string }[] = [];

  phases.forEach((phase) => {
    phase.weeks.forEach((week) => {
      params.push({
        phase: phase.slug,
        week: week.slug,
      });
    });
  });

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { phase, week } = await params;
  const content = getWeekContent(phase, week);

  if (!content) {
    return {
      title: "Week Not Found",
    };
  }

  return {
    title: `${content.metadata.title} | 52 Weeks of JavaScript`,
    description: content.metadata.goal || "Weekly JavaScript learning content",
  };
}

// Main page component
export default async function WeekPage({ params }: PageProps) {
  const { phase, week } = await params;

  // Get all phases for sidebar
  const phases = getPhases();

  // Get week content
  const content = getWeekContent(phase, week);

  if (!content) {
    notFound();
  }

  // Parse each day's note MDX content
  const dayTabs = await Promise.all(
    content.days.map(async (day) => {
      let noteContent = null;
      if (day.note) {
        const { content: parsed } = await parseMDX(day.note);
        noteContent = parsed;
      }
      return {
        dayNumber: day.dayNumber,
        slug: day.slug,
        noteContent,
        labs: day.labs,
      };
    }),
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar phases={phases} currentPhase={phase} currentWeek={week} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs
              phase={phase}
              week={week}
              weekTitle={content.metadata.title}
            />

            {/* Header */}
            <header className="mb-8 border-b-2 border-dashed border-gray-200 pb-6">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {content.metadata.title}
              </h1>

              {/* Topics */}
              {content.metadata.topics &&
                content.metadata.topics.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">
                      Topics
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                      {content.metadata.topics.map(
                        (topic: string, index: number) => (
                          <li
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm border-2 border-dashed border-gray-300"
                          >
                            {topic}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {/* Goal */}
              {content.metadata.goal && (
                <div className="bg-red-50 border-2 border-dashed border-red-600 px-4 py-3">
                  <p className="text-sm font-semibold text-red-900 mb-1">
                    Goal
                  </p>
                  <p className="text-gray-800">{content.metadata.goal}</p>
                </div>
              )}
            </header>

            {/* Day Tabs */}
            <DayTabs days={dayTabs} />

            {/* Navigation */}
            <nav className="mt-12 pt-8 border-t-2 border-dashed border-gray-200 flex justify-between">
              <div className="text-gray-600 text-sm">
                Phase:{" "}
                <span className="font-semibold capitalize">
                  {phase.replace(/-/g, " ")}
                </span>
              </div>
              <div className="text-gray-600 text-sm">
                Week:{" "}
                <span className="font-semibold">{content.metadata.title}</span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
