"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "poyraz-ui/atoms";
import {
  Navbar as PoyrazNavbar,
  NavbarActions,
  NavbarBrand,
  NavbarDropdown,
  NavbarLink,
  NavbarLinks,
  NavbarMain,
  NavbarMegaMenu,
  NavbarMegaMenuItem,
  NavbarMobileActions,
  NavbarMobileGroup,
  NavbarMobileLink,
  NavbarMobileMenu,
  NavbarMobileToggle,
  NavbarTopBar,
} from "poyraz-ui/organisms";
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
];

const utilityLinks = [
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
    <PoyrazNavbar
      variant="bordered"
      sticky
      containerClassName="container mx-auto px-4"
      className="z-50 bg-white"
    >
      <NavbarTopBar className="bg-red-600 text-white">
        <p className="text-xs font-medium">
          Based in <span className="font-semibold">Ankara</span>, {currentTime}
        </p>
      </NavbarTopBar>

      <NavbarMain className="py-3">
        <NavbarBrand href="/" className="mr-6">
          <Logo />
        </NavbarBrand>

        <NavbarLinks className="hidden flex-1 lg:flex">
          <NavbarDropdown label="Roadmap">
            <NavbarMegaMenu layout="full" className="w-full">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <NavbarMegaMenuItem
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    description={isActive ? "Current section" : "Phase overview"}
                    className={isActive ? "border-red-600 bg-red-50" : undefined}
                  />
                );
              })}
            </NavbarMegaMenu>
          </NavbarDropdown>

          {utilityLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <NavbarLink
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-red-600 border-b-2 border-dashed border-red-600"
                    : "text-gray-700"
                }
              >
                {link.title}
              </NavbarLink>
            );
          })}
        </NavbarLinks>

        <NavbarActions className="ml-auto hidden lg:flex">
          <Link href="https://poyrazavsever.com/blog" target="_blank">
            <Button variant="outline" size="sm">
              Blog
            </Button>
          </Link>
          <Link href="https://www.poyrazavsever.com">
            <Button size="sm">Return Back</Button>
          </Link>
        </NavbarActions>

        <NavbarMobileToggle className="lg:hidden ml-auto" />
      </NavbarMain>

      <NavbarMobileMenu className="lg:hidden">
        <NavbarMobileGroup label="Roadmap">
          {navLinks.map((link) => (
            <NavbarMobileLink
              key={link.href}
              href={link.href}
              active={pathname.startsWith(link.href)}
            >
              {link.title}
            </NavbarMobileLink>
          ))}
        </NavbarMobileGroup>
        <NavbarMobileGroup label="More">
          {utilityLinks.map((link) => (
            <NavbarMobileLink
              key={link.href}
              href={link.href}
              active={pathname.startsWith(link.href)}
            >
              {link.title}
            </NavbarMobileLink>
          ))}
        </NavbarMobileGroup>
        <NavbarMobileActions>
          <Link href="https://poyrazavsever.com/blog" target="_blank">
            <Button variant="outline" size="sm" className="w-full">
              Blog
            </Button>
          </Link>
          <Link href="https://www.poyrazavsever.com">
            <Button size="sm" className="w-full">
              Return Back
            </Button>
          </Link>
        </NavbarMobileActions>
      </NavbarMobileMenu>
    </PoyrazNavbar>
  );
}
