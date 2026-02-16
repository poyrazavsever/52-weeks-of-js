import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 pt-16 md:pt-24 pb-0">
          {/* Left - Text Content */}
          <div className="flex-1 max-w-xl pb-16 md:pb-24">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-none mb-0">
              52 weeks of
            </h1>
            <div className="relative inline-block">
              <span className="absolute bottom-1 left-0 w-full h-5 md:h-7 bg-red-200 z-0" />
              <h2 className="relative font-display text-5xl md:text-6xl lg:text-7xl text-red-600 leading-none mb-6">
                Javascript
              </h2>
            </div>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
              A 52-week hardcore roadmap transitioning from AI-dependent coding
              to deep software engineering foundations.
            </p>
          </div>

          {/* Right - Hero Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-auto translate-y-2">
              <Image
                src="/images/hero.png"
                alt="Poyraz Avsever - 52 Weeks of Javascript"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Red Bar */}
      <div className="relative z-10 w-full h-14 md:h-16 bg-red-600" />
    </section>
  );
}
