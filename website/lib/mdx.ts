import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { readFileSync } from "fs";
import React from "react";

interface PrettyCodeNode {
  children: Array<{ type: string; value?: string }>;
  properties: {
    className?: string[];
  };
}

// Rehype Pretty Code options for syntax highlighting
const rehypePrettyCodeOptions = {
  theme: "github-light", // Syntax highlighting theme for code blocks
  keepBackground: false,
  defaultLang: "plaintext",
  onVisitLine(node: PrettyCodeNode) {
    // Prevent empty lines from collapsing
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: PrettyCodeNode) {
    // Add class to highlighted lines
    node.properties.className = node.properties.className || [];
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedChars(node: PrettyCodeNode) {
    // Add class to highlighted words
    node.properties.className = ["word--highlighted"];
  },
};

const BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "details",
  "dialog",
  "div",
  "dl",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "ul",
]);

function hasBlockChild(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false;
    if (typeof child.type === "string" && BLOCK_TAGS.has(child.type)) {
      return true;
    }
    return false;
  });
}

const mdxComponents = {
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    // Some source notes contain markdown/HTML combinations that create
    // invalid markup like <p><ul>...</ul></p>. Render a div instead.
    if (hasBlockChild(children)) {
      return React.createElement("div", props, children);
    }
    return React.createElement("p", props, children);
  },
};

/**
 * Parse Markdown/MDX content and compile to React components
 */
export async function parseMDX(content: string) {
  const { content: compiledContent, frontmatter } = await compileMDX({
    source: content,
    components: mdxComponents,
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
  "github-light",
  "github-dark-dimmed",
  "github-dark",
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
    components: mdxComponents,
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
