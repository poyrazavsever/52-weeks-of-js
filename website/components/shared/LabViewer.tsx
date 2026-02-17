"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) {
    return null;
  }

  const currentFile = files[activeTab];

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-xs text-gray-600">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>

      <div className="border-2 border-dashed border-gray-900">
        {/* Tabs */}
        <div className="flex border-b-2 border-dashed border-gray-900 bg-gray-50">
          {files.map((file, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-2 text-xs font-mono font-semibold transition-colors border-r-2 border-dashed border-gray-900 last:border-r-0 ${
                activeTab === index
                  ? "bg-white text-red-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* File Content */}
        <div className="relative">
          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 z-10 px-2 py-1 bg-gray-800 text-white text-[0.65rem] font-semibold hover:bg-gray-700 transition-colors border border-gray-600 flex items-center gap-1"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Icon icon="mdi:check" className="text-green-400 text-xs" />
                Copied!
              </>
            ) : (
              <>
                <Icon icon="mdi:content-copy" className="text-xs" />
                Copy
              </>
            )}
          </button>

          {/* Code Display */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <pre className="p-4 overflow-x-auto bg-gray-900 text-gray-100 max-h-150 overflow-y-auto">
              <code className="text-xs font-mono leading-relaxed">
                {currentFile.content}
              </code>
            </pre>
          </motion.div>

          {/* File Info */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-t-2 border-dashed border-gray-900 text-xs text-gray-600">
            <span className="font-mono">
              Language:{" "}
              <span className="font-semibold">{currentFile.language}</span>
            </span>
            <span className="font-mono">
              Lines:{" "}
              <span className="font-semibold">
                {currentFile.content.split("\n").length}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Download All Button */}
      {files.length > 1 && (
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 border-2 border-dashed border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2"
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
            <Icon icon="mdi:download" />
            Download All Files
          </button>
        </div>
      )}
    </section>
  );
}
