import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="relative group block">
      {/* Background Red Layer */}
      <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-red-600 z-0 transition-transform duration-200 group-hover:translate-x-1"></div>

      {/* Logo Image */}
      <div className="relative w-10 h-10 overflow-hidden z-10 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
        <Image src="/logo/logo.jpeg" alt="Logo" fill className="object-cover" />
      </div>
    </Link>
  );
}
