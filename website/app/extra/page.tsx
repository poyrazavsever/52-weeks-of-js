import { getExtraContent, getPhases } from "@/lib/api";
import { parseMDX } from "@/lib/mdx";
import Sidebar from "@/components/layout/Sidebar";
import ExtraTopics from "@/components/shared/ExtraTopics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extra & The Lab | 52 Weeks of JavaScript",
  description:
    "Additional notes and topics that are useful to know but not part of the 52-week curriculum",
};

export default async function ExtraPage() {
  const phases = getPhases();
  const { readme, topics } = getExtraContent();

  // Parse README content and extract the compiled content
  const readmeContent = readme ? (await parseMDX(readme)).content : null;

  // Parse each topic's content
  const parsedTopics = await Promise.all(
    topics.map(async (topic) => {
      const parsed = await parseMDX(topic.content);
      return {
        slug: topic.slug,
        title: topic.title,
        content: parsed.content, // Extract the content from the parsed result
      };
    }),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar phases={phases} currentPhase="" currentWeek="" />

      {/* Main Content */}
      <div className="lg:pl-72">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-6 border-b-2 border-dashed border-gray-200 pb-4">
              <h1 className="text-3xl font-semibold mb-2 text-gray-900">
                Extra & The Lab
              </h1>
              <p className="text-sm text-gray-600">
                Additional topics and concepts that are useful to know but not
                directly part of the 52-week curriculum.
              </p>
            </header>

            {/* README Introduction */}
            {readmeContent && (
              <div className="mb-6">
                <article className="prose prose-gray max-w-none">
                  {readmeContent}
                </article>
              </div>
            )}

            {/* Topics */}
            {parsedTopics.length > 0 ? (
              <ExtraTopics topics={parsedTopics} />
            ) : (
              <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200">
                <p className="text-base">No extra topics available yet.</p>
                <p className="text-xs mt-1.5">
                  Check back later for additional learning materials.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
