export default function HeroSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="container mx-auto pt-16 sm:pt-12">
        <div className="flex flex-col md:flex-row items-end justify-between pb-0">
          {/* Left - Text Content */}
          <div className="flex-1 max-w-xl pb-12 md:pb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              52 weeks of
            </h1>
            <div className="relative inline-block">
              <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-red-200 z-0" />
              <h2 className="relative font-display text-3xl md:text-4xl lg:text-5xl text-red-600 leading-tight mb-4">
                Javascript
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
              A 52-week hardcore roadmap transitioning from AI-dependent coding
              to deep software engineering foundations.
            </p>
          </div>

          {/* Right - Hero Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-96 h-96 translate-y-2">
              <img
                src="/images/hero2.png"
                alt="Poyraz Avsever - 52 Weeks of Javascript"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Red Bar */}
      <div className="relative z-10 w-full h-10 md:h-12 bg-red-600" />
    </section>
  );
}
