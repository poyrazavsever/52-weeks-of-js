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
      <div className="flex flex-wrap border-b-2 border-dashed border-gray-200 mb-6 gap-1.5">
        {topics.map((topic) => (
          <button
            key={topic.slug}
            onClick={() => setActiveTopic(topic.slug)}
            className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 -mb-0.5 cursor-pointer ${
              activeTopic === topic.slug
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
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
            <article className="prose prose-gray max-w-none">
              {currentTopic.content}
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
