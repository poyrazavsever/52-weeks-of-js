"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface ExtraTopicItem {
  slug: string;
  title: string;
  content: React.ReactNode;
}

interface ExtraTopicsProps {
  topics: ExtraTopicItem[];
}

export default function ExtraTopics({ topics }: ExtraTopicsProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(
    topics[0]?.slug || null,
  );

  if (!topics || topics.length === 0) {
    return null;
  }

  const currentTopic = topics.find((t) => t.slug === activeTopic);

  return (
    <div>
      {/* Topic Tabs */}
      <div className="flex flex-wrap border-b-2 border-dashed border-gray-200 mb-8 gap-2">
        {topics.map((topic) => (
          <button
            key={topic.slug}
            onClick={() => setActiveTopic(topic.slug)}
            className={`px-6 py-3 text-sm font-semibold transition-colors border-2 border-dashed -mb-0.5 cursor-pointer ${
              activeTopic === topic.slug
                ? "border-red-600 bg-red-50 text-red-600"
                : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* Topic Content */}
      <AnimatePresence mode="wait">
        {currentTopic && (
          <motion.div
            key={currentTopic.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-2 border-dashed border-gray-900 p-8 bg-white">
              <article className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h1:text-3xl prose-h1:border-b-2 prose-h1:border-dashed prose-h1:border-red-600 prose-h1:pb-4 prose-h1:mb-6 prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-dashed prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:mb-4 prose-h3:text-xl prose-h3:text-red-600 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-red-600 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:border-2 prose-pre:border-dashed prose-pre:border-gray-900 prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-red-50 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700">
                {currentTopic.content}
              </article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
