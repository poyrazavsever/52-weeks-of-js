import { getAssetsFiles, getPhases } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import AssetsGrid from "@/components/shared/AssetsGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assets | 52 Weeks of JavaScript",
  description:
    "Project assets including images, PDFs, and other resources. Click to view on GitHub.",
};

export default function AssetsPage() {
  const phases = getPhases();
  const assets = getAssetsFiles();

  // Group assets by folder
  const assetsByFolder: Record<string, typeof assets> = {};
  assets.forEach((asset) => {
    const folder = asset.path.split("/")[0] || "root";
    if (!assetsByFolder[folder]) {
      assetsByFolder[folder] = [];
    }
    assetsByFolder[folder].push(asset);
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar phases={phases} currentPhase="" currentWeek="" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="mb-10 border-b-2 border-dashed border-gray-200 pb-5">
              <h1 className="text-4xl font-semibold mb-3 text-gray-900">
                Assets
              </h1>
              <p className="text-gray-600 text-sm">
                Project assets including images, PDFs, and other resources.
                Click on any file to view it on GitHub.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <a
                  href="https://github.com/poyrazavsever/52-weeks-of-js/tree/main/assets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white hover:bg-red-600 transition-colors border-2 border-dashed border-gray-900 hover:border-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </header>

            {/* Assets by Folder */}
            {Object.keys(assetsByFolder).length > 0 ? (
              <div className="space-y-10">
                {Object.entries(assetsByFolder).map(([folder, files]) => (
                  <section key={folder}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-dashed border-gray-200 capitalize">
                      {folder}
                    </h2>
                    <AssetsGrid files={files} />
                  </section>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200">
                <p className="text-base">No assets available yet.</p>
                <p className="text-xs mt-1.5">
                  Assets will appear here once they are added to the project.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
