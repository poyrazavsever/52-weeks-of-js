import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Types
export interface Phase {
  slug: string;
  title: string;
  number: number;
  weeks: Week[];
}

export interface Week {
  slug: string;
  title: string;
  number: number;
  phase: string;
  hasLab: boolean;
  hasNotes: boolean;
  days: DaySummary[];
}

export interface DaySummary {
  slug: string; // "day-1", "day-2", etc.
  number: number;
  hasNotes: boolean;
  hasLab: boolean;
  labCount: number;
}

export interface DayContent {
  dayNumber: number;
  slug: string;
  note: string; // raw MDX content of note-tr.mdx
  labs: LabFolder[];
}

export interface LabFolder {
  name: string; // "1", "2", "3", etc.
  files: LabFile[];
}

export interface WeekContent {
  metadata: {
    title: string;
    topics?: string[];
    goal?: string;
  };
  readme: string;
  days: DayContent[];
}

export interface LabFile {
  name: string;
  content: string;
  language: string;
  path: string;
}

// Root directory - parent of website folder
const ROOT_DIR = path.join(process.cwd(), "..");

// Phase folder mapping
const PHASE_FOLDERS = {
  "iron-foundations": "01-iron-foundations",
  "web-architecture": "02-web-architecture",
  "universal-ecosystem": "03-universal-ecosystem",
  "seniority-cs": "04-seniority-cs",
};

const PHASE_TITLES = {
  "iron-foundations": "Iron Foundations",
  "web-architecture": "Web Architecture",
  "universal-ecosystem": "Universal Ecosystem",
  "seniority-cs": "Seniority & CS",
};

/**
 * Get all phases from the repository
 */
export function getPhases(): Phase[] {
  const phases: Phase[] = [];

  Object.entries(PHASE_FOLDERS).forEach(([slug, folderName], index) => {
    const phasePath = path.join(ROOT_DIR, folderName);

    if (!fs.existsSync(phasePath)) {
      return;
    }

    const weeks = getWeeksByPhase(slug);

    phases.push({
      slug,
      title: PHASE_TITLES[slug as keyof typeof PHASE_TITLES],
      number: index + 1,
      weeks,
    });
  });

  return phases;
}

/**
 * Get all weeks in a specific phase
 */
export function getWeeksByPhase(phaseSlug: string): Week[] {
  const folderName = PHASE_FOLDERS[phaseSlug as keyof typeof PHASE_FOLDERS];
  if (!folderName) return [];

  const phasePath = path.join(ROOT_DIR, folderName);

  if (!fs.existsSync(phasePath)) {
    return [];
  }

  const weeks: Week[] = [];
  const items = fs.readdirSync(phasePath);

  items.forEach((item) => {
    const itemPath = path.join(phasePath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory() && item.startsWith("week-")) {
      const weekNumber = parseInt(item.match(/week-(\d+)/)?.[1] || "0");
      const weekTitle = extractWeekTitle(item);

      // Scan for days
      const days = getDaySummaries(itemPath);

      const hasLab = days.some((d) => d.hasLab);
      const hasNotes = days.some((d) => d.hasNotes);

      weeks.push({
        slug: item,
        title: weekTitle,
        number: weekNumber,
        phase: phaseSlug,
        hasLab,
        hasNotes,
        days,
      });
    }
  });

  return weeks.sort((a, b) => a.number - b.number);
}

/**
 * Scan a week folder for day-X summaries
 */
function getDaySummaries(weekPath: string): DaySummary[] {
  const days: DaySummary[] = [];

  // Check notes/day-X and lab/day-X
  const notesPath = path.join(weekPath, "notes");
  const labPath = path.join(weekPath, "lab");

  // Collect all day slugs from both notes and lab
  const daySlugs = new Set<string>();

  if (fs.existsSync(notesPath)) {
    fs.readdirSync(notesPath).forEach((item) => {
      if (
        item.startsWith("day-") &&
        fs.statSync(path.join(notesPath, item)).isDirectory()
      ) {
        daySlugs.add(item);
      }
    });
  }

  if (fs.existsSync(labPath)) {
    fs.readdirSync(labPath).forEach((item) => {
      if (
        item.startsWith("day-") &&
        fs.statSync(path.join(labPath, item)).isDirectory()
      ) {
        daySlugs.add(item);
      }
    });
  }

  daySlugs.forEach((slug) => {
    const dayNumber = parseInt(slug.match(/day-(\d+)/)?.[1] || "0");
    const dayNotesPath = path.join(notesPath, slug);
    const dayLabPath = path.join(labPath, slug);

    const hasNotes =
      fs.existsSync(dayNotesPath) &&
      fs
        .readdirSync(dayNotesPath)
        .some((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    let labCount = 0;
    const hasLab = fs.existsSync(dayLabPath);
    if (hasLab) {
      labCount = fs.readdirSync(dayLabPath).filter((item) => {
        return fs.statSync(path.join(dayLabPath, item)).isDirectory();
      }).length;
    }

    days.push({
      slug,
      number: dayNumber,
      hasNotes,
      hasLab,
      labCount,
    });
  });

  return days.sort((a, b) => a.number - b.number);
}

/**
 * Extract week title from folder name
 * Example: "week-01-js-memory" -> "JS Memory"
 */
function extractWeekTitle(folderName: string): string {
  const parts = folderName.split("-").slice(2); // Skip "week" and number
  return parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get specific week content with all days
 */
export function getWeekContent(
  phaseSlug: string,
  weekSlug: string,
): WeekContent | null {
  const folderName = PHASE_FOLDERS[phaseSlug as keyof typeof PHASE_FOLDERS];
  if (!folderName) return null;

  const weekPath = path.join(ROOT_DIR, folderName, weekSlug);

  if (!fs.existsSync(weekPath)) {
    return null;
  }

  // Read README.mdx for week metadata
  const readmePath = path.join(weekPath, "README.mdx");
  let readme = "";
  let metadata: WeekContent["metadata"] = {
    title: extractWeekTitle(weekSlug),
  };

  if (fs.existsSync(readmePath)) {
    const fileContent = fs.readFileSync(readmePath, "utf-8");
    const { content, data } = matter(fileContent);
    readme = content;

    if (!data.topics) {
      const topicsMatch = content.match(/## Topics\n\n([\s\S]*?)\n\n##/);
      if (topicsMatch) {
        data.topics = topicsMatch[1]
          .split("\n")
          .filter((line: string) => line.trim().startsWith("-"))
          .map((line: string) => line.trim().replace(/^-\s*/, ""));
      }
    }

    if (!data.goal) {
      const goalMatch = content.match(/## Goal\n\n(.*)/);
      if (goalMatch) {
        data.goal = goalMatch[1].trim();
      }
    }

    metadata = { ...metadata, ...data };
  }

  // Get day summaries and load full content for each day
  const daySummaries = getDaySummaries(weekPath);
  const days: DayContent[] = daySummaries.map((daySummary) =>
    loadDayContent(weekPath, daySummary),
  );

  return {
    metadata,
    readme,
    days,
  };
}

/**
 * Load full content for a single day
 */
function loadDayContent(weekPath: string, daySummary: DaySummary): DayContent {
  const { slug, number: dayNumber } = daySummary;

  // Read note
  let note = "";
  const notePath = path.join(weekPath, "notes", slug, "note-tr.mdx");
  if (fs.existsSync(notePath)) {
    note = fs.readFileSync(notePath, "utf-8");
  } else {
    // Fallback: try note-tr.md or any .mdx/.md file
    const noteDir = path.join(weekPath, "notes", slug);
    if (fs.existsSync(noteDir)) {
      const noteFiles = fs
        .readdirSync(noteDir)
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
      if (noteFiles.length > 0) {
        note = fs.readFileSync(path.join(noteDir, noteFiles[0]), "utf-8");
      }
    }
  }

  // Read labs
  const labs: LabFolder[] = [];
  const labDayPath = path.join(weekPath, "lab", slug);
  if (fs.existsSync(labDayPath)) {
    const labFolders = fs
      .readdirSync(labDayPath)
      .filter((item) => fs.statSync(path.join(labDayPath, item)).isDirectory())
      .sort((a, b) => parseInt(a) - parseInt(b));

    labFolders.forEach((folderName) => {
      const folderPath = path.join(labDayPath, folderName);
      const files = readLabFolder(folderPath);
      labs.push({ name: folderName, files });
    });
  }

  return {
    dayNumber,
    slug,
    note,
    labs,
  };
}

/**
 * Read all files from a lab folder
 */
function readLabFolder(folderPath: string): LabFile[] {
  const files: LabFile[] = [];
  const items = fs.readdirSync(folderPath);

  items.forEach((item) => {
    const filePath = path.join(folderPath, item);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      const content = fs.readFileSync(filePath, "utf-8");
      const ext = path.extname(item).slice(1);
      const language = getLanguageFromExtension(ext);

      files.push({
        name: item,
        content,
        language,
        path: filePath,
      });
    }
  });

  return files;
}

/**
 * Map file extension to language identifier
 */
function getLanguageFromExtension(ext: string): string {
  const map: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "javascript",
    tsx: "typescript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
  };
  return map[ext] || "text";
}

/**
 * Get resources content
 */
export function getResourcesContent(): {
  books: string;
  tools: string;
  weeklyResources: string;
} {
  const resourcesPath = path.join(ROOT_DIR, "resources");

  const books = fs.existsSync(path.join(resourcesPath, "books.md"))
    ? fs.readFileSync(path.join(resourcesPath, "books.md"), "utf-8")
    : "";

  const tools = fs.existsSync(path.join(resourcesPath, "tools.md"))
    ? fs.readFileSync(path.join(resourcesPath, "tools.md"), "utf-8")
    : "";

  const weeklyResources = fs.existsSync(
    path.join(resourcesPath, "weekly-resources.md"),
  )
    ? fs.readFileSync(path.join(resourcesPath, "weekly-resources.md"), "utf-8")
    : "";

  return { books, tools, weeklyResources };
}

/**
 * Get extra content
 */
export function getExtraContent(): { notes: string; lab: string } {
  const extraPath = path.join(ROOT_DIR, "extra");

  // Get all markdown files from notes
  const notesPath = path.join(extraPath, "notes");
  let notes = "";
  if (fs.existsSync(notesPath)) {
    const files = fs.readdirSync(notesPath).filter((f) => f.endsWith(".md"));
    notes = files
      .map((f) => {
        return fs.readFileSync(path.join(notesPath, f), "utf-8");
      })
      .join("\n\n---\n\n");
  }

  // Lab folder info
  const labPath = path.join(extraPath, "lab");
  let lab = "";
  if (fs.existsSync(labPath)) {
    lab = "Extra lab content available";
  }

  return { notes, lab };
}
