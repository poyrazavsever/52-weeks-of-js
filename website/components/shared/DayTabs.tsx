"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Badge, Button, ScrollArea } from "poyraz-ui/atoms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "poyraz-ui/molecules";
import type { LabFile } from "@/lib/api";

interface DayTab {
  dayNumber: number;
  slug: string;
  noteContent: React.ReactNode | null;
  labs: {
    name: string;
    files: LabFile[];
  }[];
}

interface DayTabsProps {
  days: DayTab[];
}

export default function DayTabs({ days }: DayTabsProps) {
  if (!days || days.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-gray-500">
        <p>Bu hafta icin henuz icerik eklenmemis.</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue={days[0].slug} className="w-full">
      <TabsList className="mb-6 h-auto flex-wrap justify-start">
        {days.map((day) => (
          <TabsTrigger key={day.slug} value={day.slug}>
            Day {day.dayNumber}
          </TabsTrigger>
        ))}
      </TabsList>

      {days.map((day) => (
        <TabsContent key={day.slug} value={day.slug} className="mt-0">
          {day.noteContent && (
            <article className="prose prose-gray mb-12 max-w-none">
              {day.noteContent}
            </article>
          )}

          {!day.noteContent && day.labs.length === 0 && (
            <div className="rounded-sm border py-8 text-center text-gray-400">
              <Icon
                icon="mdi:file-document-outline"
                className="mx-auto mb-1.5 text-3xl"
              />
              <p className="text-xs">
                Day {day.dayNumber} icin henuz icerik eklenmemis.
              </p>
            </div>
          )}

          {day.labs.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:code-braces" className="text-red-600" />
                <h3 className="text-base font-semibold text-gray-900">
                  Lab Dosyalari
                </h3>
              </div>

              <Accordion type="single" collapsible>
                {day.labs.map((lab) => (
                  <LabAccordion
                    key={lab.name}
                    value={lab.name}
                    title={`Lab ${lab.name}`}
                    files={lab.files}
                  />
                ))}
              </Accordion>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface LabAccordionProps {
  value: string;
  title: string;
  files: LabFile[];
}

function LabAccordion({ value, title, files }: LabAccordionProps) {
  const [activeFile, setActiveFile] = useState(files[0]?.name ?? "");
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) return null;

  const currentFile =
    files.find((file) => file.name === activeFile) ?? files[0];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <AccordionItem value={value}>
      <AccordionTrigger>
        <span className="flex items-center gap-2">
          <Badge>{title.split(" ")[1]}</Badge>
          <span>{title}</span>
          <span className="text-[0.65rem] text-gray-500">
            ({files.length} {files.length === 1 ? "file" : "files"})
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <Tabs value={activeFile} onValueChange={setActiveFile}>
          <TabsList className="mb-3 h-auto flex-wrap justify-start">
            {files.map((file) => (
              <TabsTrigger key={file.name} value={file.name}>
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {files.map((file) => (
            <TabsContent key={file.name} value={file.name}>
              <div className="relative rounded-sm border bg-gray-950 text-gray-100">
                <div className="absolute right-3 top-3 z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="bg-white/90"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <ScrollArea className="max-h-96">
                  <pre className="overflow-x-auto p-4">
                    <code className="text-xs font-mono leading-relaxed">
                      {file.content}
                    </code>
                  </pre>
                </ScrollArea>

                <div className="flex items-center justify-between border-t bg-gray-100 px-4 py-2 text-xs text-gray-600">
                  <span className="font-mono">{file.language}</span>
                  <span className="font-mono">
                    {file.content.split("\n").length} lines
                  </span>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
}
