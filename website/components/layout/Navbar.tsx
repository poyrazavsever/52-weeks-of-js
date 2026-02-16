"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "Iron Foundations",
    href: "/iron-foundations",
    icon: "mdi:hammer-wrench",
  },
  {
    title: "Web Architecture",
    href: "/web-architecture",
    icon: "mdi:web",
  },
  {
    title: "Universal Ecosystem",
    href: "/universal-ecosystem",
    icon: "mdi:earth",
  },
  {
    title: "Seniority & CS",
    href: "/seniority-cs",
    icon: "mdi:trophy",
  },
];

const secondaryItems = [
  {
    title: "Extra / The Lab",
    href: "/extra",
    icon: "mdi:flask",
  },
  {
    title: "Resources",
    href: "/resources",
    icon: "mdi:book-open-variant",
  },
  {
    title: "Assets",
    href: "/assets",
    icon: "mdi:folder-image",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

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
      <div className="bg-red-600 text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <p className="font-medium">
            Based in <span className="font-bold">Ankara</span>, {currentTime}
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <Link href="/" className="relative">
                <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-red-600 z-0"></div>
                <div className="relative w-12 h-12 overflow-hidden z-10">
                  <Image
                    src="/logo/logo.jpeg"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-gray-900 hover:text-red-600 transition-colors cursor-pointer pb-1 ${
                  isOpen ? "border-b-2 border-dashed border-red-600" : ""
                }`}
              >
                <h1>52 Week Of Javascript</h1>
                <Icon
                  icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                  className="text-2xl"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex gap-16">
                {/* Left Column */}
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors py-1 group"
                    >
                      <Icon
                        icon={item.icon}
                        className="text-lg text-gray-400 group-hover:text-red-600 transition-colors"
                      />
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                  {secondaryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors py-1 group"
                    >
                      <Icon
                        icon={item.icon}
                        className="text-lg text-gray-400 group-hover:text-red-600 transition-colors"
                      />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
