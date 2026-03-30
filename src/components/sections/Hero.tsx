import { siteData } from "@/lib/site-data";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero } = siteData;

  return (
    <section className="relative min-h-screen flex items-center bg-cream overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sand/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-sage/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 w-full pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          {/* Language badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-warm-white/80 rounded-full border border-sand">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-warm-gray">
              English
            </span>
            <span className="w-1 h-1 rounded-full bg-terracotta" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-warm-gray">
              Español
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1] tracking-tight">
            {hero.headline}
          </h1>

          <p className="mt-7 text-lg md:text-xl text-warm-gray leading-relaxed max-w-xl">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" href={siteData.bookingUrl}>
              {hero.cta}
            </Button>
            <Button variant="ghost" href="#about">
              {hero.secondaryCta} &darr;
            </Button>
          </div>

          {/* Trust signal */}
          <div className="mt-14 flex items-center gap-6 text-sm text-warm-gray">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-sage"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-sage"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Insurance accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-sage"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Telehealth available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
