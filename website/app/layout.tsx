import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Agbalumo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const agbalumo = Agbalumo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-agbalumo",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${agbalumo.variable}`}
    >
      <body className="font-sans antialiased">
        <Navbar />
        <main className="pt-22">{children}</main>
      </body>
    </html>
  );
}
