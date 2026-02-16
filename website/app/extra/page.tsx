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
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar phases={phases} currentPhase="" currentWeek="" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12 border-b-2 border-dashed border-gray-200 pb-6">
              <h1 className="text-5xl font-bold mb-4 text-gray-900">
                Extra & The Lab
              </h1>
              <p className="text-gray-600 text-lg">
                Additional topics and concepts that are useful to know but not
                directly part of the 52-week curriculum.
              </p>
            </header>

            {/* README Introduction */}
            {readmeContent && (
              <div className="mb-12 bg-red-50 border-2 border-dashed border-red-600 p-6">
                <article className="prose prose-gray max-w-none prose-p:text-gray-700 prose-strong:text-red-600 prose-ul:text-gray-700">
                  {readmeContent}
                </article>
              </div>
            )}

            {/* Topics */}
            {parsedTopics.length > 0 ? (
              <ExtraTopics topics={parsedTopics} />
            ) : (
              <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200">
                <p className="text-lg">No extra topics available yet.</p>
                <p className="text-sm mt-2">
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
