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
}

export interface WeekContent {
  metadata: {
    title: string;
    topics?: string[];
    goal?: string;
  };
  readme: string;
  labFolders?: string[];
  notesFiles?: string[];
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

      const hasLab = fs.existsSync(path.join(itemPath, "lab"));
      const hasNotes = fs.existsSync(path.join(itemPath, "notes"));

      weeks.push({
        slug: item,
        title: weekTitle,
        number: weekNumber,
        phase: phaseSlug,
        hasLab,
        hasNotes,
      });
    }
  });

  return weeks.sort((a, b) => a.number - b.number);
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
 * Get specific week content
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

  const readmePath = path.join(weekPath, "README.mdx");
  let readme = "";
  let metadata = {
    title: extractWeekTitle(weekSlug),
  };

  if (fs.existsSync(readmePath)) {
    const fileContent = fs.readFileSync(readmePath, "utf-8");
    const { content, data } = matter(fileContent);
    readme = content;

    // Extract topics and goal from markdown if not in frontmatter
    if (!data.topics) {
      const topicsMatch = content.match(/## Topics\n\n([\s\S]*?)\n\n##/);
      if (topicsMatch) {
        data.topics = topicsMatch[1]
          .split("\n")
          .filter((line) => line.trim().startsWith("-"))
          .map((line) => line.trim().replace(/^-\s*/, ""));
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

  // Get lab folders
  const labPath = path.join(weekPath, "lab");
  let labFolders: string[] = [];
  if (fs.existsSync(labPath)) {
    labFolders = fs.readdirSync(labPath).filter((item) => {
      const itemPath = path.join(labPath, item);
      return fs.statSync(itemPath).isDirectory();
    });
  }

  // Get notes files
  const notesPath = path.join(weekPath, "notes");
  let notesFiles: string[] = [];
  if (fs.existsSync(notesPath)) {
    notesFiles = fs.readdirSync(notesPath).filter((item) => {
      return item.endsWith(".md");
    });
  }

  return {
    metadata,
    readme,
    labFolders,
    notesFiles,
  };
}

/**
 * Get lab files from a specific lab folder
 */
export function getLabFiles(
  phaseSlug: string,
  weekSlug: string,
  labNumber: string,
): LabFile[] {
  const folderName = PHASE_FOLDERS[phaseSlug as keyof typeof PHASE_FOLDERS];
  if (!folderName) return [];

  const labPath = path.join(ROOT_DIR, folderName, weekSlug, "lab", labNumber);

  if (!fs.existsSync(labPath)) {
    return [];
  }

  const files: LabFile[] = [];
  const items = fs.readdirSync(labPath);

  items.forEach((item) => {
    const filePath = path.join(labPath, item);
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
