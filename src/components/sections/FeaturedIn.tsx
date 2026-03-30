"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function FeaturedIn() {
  const { featuredIn } = siteData;

  return (
    <section className="py-16 md:py-24 bg-cream border-y border-sand/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnScroll>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-warm-gray mb-10">
            {featuredIn.headline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {featuredIn.outlets.map((outlet, i) => (
              <span
                key={i}
                className="text-lg md:text-xl font-serif text-warm-gray-light/70 hover:text-charcoal transition-colors duration-300 cursor-default"
              >
                {outlet}
              </span>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
