"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeDay, setActiveDay] = useState(0);

  if (!days || days.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-xs">
        <p>Bu hafta için henüz içerik eklenmemiş.</p>
      </div>
    );
  }

  const currentDay = days[activeDay];

  return (
    <div>
      {/* Day Tabs */}
      <div className="flex border-b-2 border-dashed border-gray-200 mb-6">
        {days.map((day, index) => (
          <button
            key={day.slug}
            onClick={() => setActiveDay(index)}
            className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 -mb-0.5 cursor-pointer ${
              activeDay === index
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Day Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Note Content */}
          {currentDay.noteContent && (
            <article className="prose prose-gray max-w-none mb-12">
              {currentDay.noteContent}
            </article>
          )}

          {!currentDay.noteContent && currentDay.labs.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200">
              <Icon
                icon="mdi:file-document-outline"
                className="text-3xl mx-auto mb-1.5"
              />
              <p className="text-xs">
                Day {currentDay.dayNumber} için henüz içerik eklenmemiş.
              </p>
            </div>
          )}

          {/* Lab Sections */}
          {currentDay.labs.length > 0 && (
            <div className="mt-8 space-y-6">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Icon icon="mdi:code-braces" className="text-red-600" />
                Lab Dosyaları
              </h3>
              {currentDay.labs.map((lab) => (
                <LabAccordion
                  key={lab.name}
                  title={`Lab ${lab.name}`}
                  files={lab.files}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Lab Accordion ─── */

interface LabAccordionProps {
  title: string;
  files: LabFile[];
}

function LabAccordion({ title, files }: LabAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) return null;

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
    <div className="border-2 border-dashed border-gray-300">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 bg-red-600 text-white text-[0.65rem] font-semibold flex items-center justify-center">
            {title.split(" ")[1]}
          </span>
          <span className="text-xs font-semibold text-gray-900">{title}</span>
          <span className="text-[0.65rem] text-gray-500">
            ({files.length} {files.length === 1 ? "file" : "files"})
          </span>
        </div>
        <Icon
          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
          className="text-base text-gray-600"
        />
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* File Tabs */}
            <div className="flex border-t-2 border-b-2 border-dashed border-gray-300 bg-gray-50">
              {files.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1.5 text-[0.65rem] font-mono font-semibold transition-colors border-r-2 border-dashed border-gray-300 last:border-r-0 cursor-pointer ${
                    activeTab === index
                      ? "bg-white text-red-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>

            {/* Code Display */}
            <div className="relative">
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 z-10 px-2 py-1 bg-gray-800 text-white text-[0.65rem] font-semibold hover:bg-gray-700 transition-colors border border-gray-600 flex items-center gap-1 cursor-pointer"
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

              <pre className="p-3 overflow-x-auto bg-gray-900 text-gray-100 max-h-96 overflow-y-auto">
                <code className="text-xs font-mono leading-relaxed">
                  {currentFile.content}
                </code>
              </pre>

              <div className="flex items-center justify-between px-4 py-1.5 bg-gray-100 border-t-2 border-dashed border-gray-300 text-xs text-gray-500">
                <span className="font-mono">{currentFile.language}</span>
                <span className="font-mono">
                  {currentFile.content.split("\n").length} lines
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
