import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { readFileSync } from "fs";
import path from "path";

// Rehype Pretty Code options for syntax highlighting
const rehypePrettyCodeOptions = {
  theme: "github-dark-dimmed", // Syntax highlighting theme for code blocks
  keepBackground: true,
  defaultLang: "plaintext",
  onVisitLine(node: any) {
    // Prevent empty lines from collapsing
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: any) {
    // Add class to highlighted lines
    node.properties.className = node.properties.className || [];
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedChars(node: any) {
    // Add class to highlighted words
    node.properties.className = ["word--highlighted"];
  },
};

/**
 * Parse Markdown/MDX content and compile to React components
 */
export async function parseMDX(content: string) {
  const { content: compiledContent, frontmatter } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm, // GitHub Flavored Markdown support (tables, task lists, etc.)
        ],
        rehypePlugins: [
          [rehypePrettyCode, rehypePrettyCodeOptions], // Shiki-based syntax highlighting
        ],
      },
    },
  });

  return {
    content: compiledContent,
    frontmatter,
  };
}

/**
 * Parse MDX from a file path
 */
export async function parseMDXFromFile(filePath: string) {
  const content = readFileSync(filePath, "utf-8");
  return parseMDX(content);
}

/**
 * Get available themes for syntax highlighting
 */
export const AVAILABLE_THEMES = [
  "github-dark-dimmed",
  "github-dark",
  "github-light",
  "one-dark-pro",
  "monokai",
  "nord",
  "dracula",
] as const;

/**
 * Parse MDX with custom theme
 */
export async function parseMDXWithTheme(
  content: string,
  theme: (typeof AVAILABLE_THEMES)[number],
) {
  const customOptions = {
    ...rehypePrettyCodeOptions,
    theme,
  };

  const { content: compiledContent, frontmatter } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, customOptions]],
      },
    },
  });

  return {
    content: compiledContent,
    frontmatter,
  };
}
