import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Poyraz Avsever - 52 weeks of Javascript",
  description:
    "A collection of 52 JavaScript projects, one for each week of the year, showcasing various concepts and techniques in JavaScript programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-22">{children}</main>
      </body>
    </html>
  );
}
