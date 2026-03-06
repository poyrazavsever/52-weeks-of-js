"use client";

import { Icon } from "@iconify/react";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "poyraz-ui/atoms";
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
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <a
          key={file.path}
          href={file.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card
            variant="bordered"
            className="h-full transition-all duration-200 group-hover:border-gray-900 group-hover:shadow-lg"
          >
            <CardHeader className="items-center text-center">
              <div
                className={`flex h-12 w-12 items-center justify-center border-2 border-dashed ${getFileColor(file.type)} transition-transform group-hover:scale-110`}
              >
                <Icon icon={getFileIcon(file.type)} className="text-2xl" />
              </div>
              <CardTitle className="w-full truncate text-center font-mono text-xs">
                {file.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-center">
              <div className="flex justify-center">
                <Badge variant="outline" className="uppercase">
                  {file.type}
                </Badge>
              </div>
              <div className="flex items-center justify-center gap-1.5 border-t border-dashed border-gray-200 pt-3 text-[0.65rem] text-gray-500 transition-colors group-hover:text-red-600">
                <Icon icon="mdi:github" className="text-sm" />
                <span>View on GitHub</span>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
