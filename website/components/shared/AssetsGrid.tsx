"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import type { AssetsFile } from "@/lib/api";

interface AssetsGridProps {
  files: AssetsFile[];
}

export default function AssetsGrid({ files }: AssetsGridProps) {
  const getFileIcon = (type: string): string => {
    switch (type) {
      case "image":
        return "mdi:image";
      case "video":
        return "mdi:video";
      case "document":
        return "mdi:file-pdf-box";
      default:
        return "mdi:file";
    }
  };

  const getFileColor = (type: string): string => {
    switch (type) {
      case "image":
        return "text-blue-600 bg-blue-50 border-blue-600";
      case "video":
        return "text-purple-600 bg-purple-50 border-purple-600";
      case "document":
        return "text-red-600 bg-red-50 border-red-600";
      default:
        return "text-gray-600 bg-gray-50 border-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {files.map((file) => (
        <a
          key={file.path}
          href={file.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-2 border-dashed border-gray-300 hover:border-gray-900 transition-all duration-200 p-4 hover:shadow-lg bg-white"
        >
          {/* File Icon */}
          <div
            className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center border-2 border-dashed ${getFileColor(file.type)} transition-transform group-hover:scale-110`}
          >
            <Icon icon={getFileIcon(file.type)} className="text-2xl" />
          </div>

          {/* File Name */}
          <h3 className="text-xs font-mono font-semibold text-gray-900 text-center mb-2 truncate group-hover:text-red-600 transition-colors">
            {file.name}
          </h3>

          {/* File Type Badge */}
          <div className="flex justify-center">
            <span className="text-[0.65rem] px-1.5 py-0.5 bg-gray-100 text-gray-600 border border-dashed border-gray-300 uppercase font-semibold">
              {file.type}
            </span>
          </div>

          {/* GitHub Link Indicator */}
          <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex items-center justify-center gap-1.5 text-[0.65rem] text-gray-500 group-hover:text-red-600 transition-colors">
            <Icon icon="mdi:github" className="text-sm" />
            <span>View on GitHub</span>
          </div>
        </a>
      ))}
    </div>
  );
}
