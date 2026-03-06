"use client";

import { useState } from "react";
import { Button, ScrollArea } from "poyraz-ui/atoms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "poyraz-ui/molecules";

export interface LabFile {
  name: string;
  content: string;
  language: string;
  path: string;
}

interface LabViewerProps {
  files: LabFile[];
  title?: string;
}

export default function LabViewer({
  files,
  title = "Lab Files",
}: LabViewerProps) {
  const [activeFile, setActiveFile] = useState(files[0]?.name ?? "");
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) {
    return null;
  }

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
    <section className="mt-10 border-t-2 border-dashed border-gray-200 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-xs text-gray-600">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>

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
                  aria-label="Copy code"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <ScrollArea className="max-h-[38rem]">
                <pre className="overflow-x-auto p-4">
                  <code className="text-xs font-mono leading-relaxed">
                    {file.content}
                  </code>
                </pre>
              </ScrollArea>

              <div className="flex items-center justify-between border-t bg-gray-100 px-4 py-2 text-xs text-gray-600">
                <span className="font-mono">
                  Language: <span className="font-semibold">{file.language}</span>
                </span>
                <span className="font-mono">
                  Lines:{" "}
                  <span className="font-semibold">
                    {file.content.split("\n").length}
                  </span>
                </span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {files.length > 1 && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              files.forEach((file) => {
                const blob = new Blob([file.content], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = file.name;
                a.click();
                URL.revokeObjectURL(url);
              });
            }}
          >
            Download All Files
          </Button>
        </div>
      )}
    </section>
  );
}
