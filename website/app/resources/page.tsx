import { getResourcesContent } from "@/lib/api";
import { parseMDX } from "@/lib/mdx";
import Sidebar from "@/components/layout/Sidebar";
import { getPhases } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | 52 Weeks of JavaScript",
  description:
    "Books, tools, and weekly resources used throughout the 52 weeks journey",
};

export default async function ResourcesPage() {
  const phases = getPhases();
  const { books, tools, weeklyResources } = getResourcesContent();

  // Parse MDX content and extract the compiled content
  const booksContent = books ? (await parseMDX(books)).content : null;
  const toolsContent = tools ? (await parseMDX(tools)).content : null;
  const weeklyContent = weeklyResources
    ? (await parseMDX(weeklyResources)).content
    : null;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar phases={phases} currentPhase="" currentWeek="" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8 border-b-2 border-dashed border-gray-200 pb-6">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Resources
              </h1>
              <p className="text-gray-600">
                A collection of books, tools, and weekly resources used
                throughout the 52 weeks journey of mastering JavaScript and
                software engineering.
              </p>
            </header>

            {/* Books Section */}
            {booksContent && (
              <section className="mb-12">
                <article className="prose prose-gray max-w-none">
                  {booksContent}
                </article>
              </section>
            )}

            {/* Tools Section */}
            {toolsContent && (
              <section className="mb-12">
                <article className="prose prose-gray max-w-none">
                  {toolsContent}
                </article>
              </section>
            )}

            {/* Weekly Resources Section */}
            {weeklyContent && (
              <section className="mb-12">
                <article className="prose prose-gray max-w-none">
                  {weeklyContent}
                </article>
              </section>
            )}

            {/* Empty State */}
            {!booksContent && !toolsContent && !weeklyContent && (
              <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200">
                <p className="text-lg">No resources available yet.</p>
                <p className="text-sm mt-2">
                  Check back later for books, tools, and weekly learning
                  materials.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
