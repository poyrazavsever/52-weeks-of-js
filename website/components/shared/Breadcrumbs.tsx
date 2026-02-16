import Link from "next/link";
import { getPhases } from "@/lib/api";

interface BreadcrumbsProps {
  phase: string;
  week?: string;
  weekTitle?: string;
}

export default function Breadcrumbs({
  phase,
  week,
  weekTitle,
}: BreadcrumbsProps) {
  const phases = getPhases();
  const currentPhase = phases.find((p) => p.slug === phase);

  if (!currentPhase) {
    return null;
  }

  return (
    <nav
      className="mb-6 flex items-center gap-2 text-sm flex-wrap"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="text-gray-600 hover:text-red-600 transition-colors font-medium"
      >
        Home
      </Link>

      <span className="text-gray-400">/</span>

      <Link
        href={`/${phase}`}
        className="text-gray-600 hover:text-red-600 transition-colors font-medium"
      >
        {currentPhase.title}
      </Link>

      {week && (
        <>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
            {weekTitle || week}
          </span>
        </>
      )}
    </nav>
  );
}
