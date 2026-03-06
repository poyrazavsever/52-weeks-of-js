import Link from "next/link";
import { getPhases } from "@/lib/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "poyraz-ui/molecules";

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
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${phase}`}>{currentPhase.title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {week && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{weekTitle || week}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
