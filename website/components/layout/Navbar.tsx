"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "./Logo";

const navLinks = [
  {
    title: "Iron Foundations",
    href: "/iron-foundations",
  },
  {
    title: "Web Architecture",
    href: "/web-architecture",
  },
  {
    title: "Universal Ecosystem",
    href: "/universal-ecosystem",
  },
  {
    title: "Seniority & CS",
    href: "/seniority-cs",
  },
  {
    title: "Extra / The Lab",
    href: "/extra",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Assets",
    href: "/assets",
  },
];

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-red-600 text-white text-xs py-1.5">
        <div className="container mx-auto px-4">
          <p className="font-medium">
            Based in <span className="font-semibold">Ankara</span>,{" "}
            {currentTime}
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-3">
            {/* Logo */}
            <Logo />

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 ml-6">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-medium transition-colors pb-1 ${
                      isActive
                        ? "text-red-600 border-b-2 border-dashed border-red-600"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <Link href="https://poyrazavsever.com/blog" target="_blank">
                <Button variant="outline" size="sm">
                  Blog
                </Button>
              </Link>
              <Link href="https://www.poyrazavsever.com">
                <Button variant="solid" size="sm">
                  Return Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
