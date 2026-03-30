"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Credentials() {
  const { credentials } = siteData;

  return (
    <section className="py-24 md:py-36 bg-warm-white">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionLabel>Trust & Expertise</SectionLabel>
            <SectionHeading className="mt-4">
              {credentials.headline}
            </SectionHeading>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="mt-14 md:mt-18 grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-cream/60 border border-sand/30"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-sage-dark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm md:text-base text-charcoal-light leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
