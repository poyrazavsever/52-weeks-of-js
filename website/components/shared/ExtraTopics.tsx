"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "poyraz-ui/molecules";

interface ExtraTopicItem {
  slug: string;
  title: string;
  content: React.ReactNode;
}

interface ExtraTopicsProps {
  topics: ExtraTopicItem[];
}

export default function ExtraTopics({ topics }: ExtraTopicsProps) {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={topics[0].slug} className="w-full">
      <TabsList className="mb-6 h-auto flex-wrap justify-start">
        {topics.map((topic) => (
          <TabsTrigger key={topic.slug} value={topic.slug}>
            {topic.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {topics.map((topic) => (
        <TabsContent key={topic.slug} value={topic.slug}>
          <article className="prose prose-gray max-w-none">{topic.content}</article>
        </TabsContent>
      ))}
    </Tabs>
  );
}
