"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AdditionalServices() {
  const { additionalServices } = siteData;

  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionLabel>Beyond Individual Sessions</SectionLabel>
            <SectionHeading className="mt-4">
              {additionalServices.headline}
            </SectionHeading>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {additionalServices.items.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="flex gap-5 p-6 md:p-8 bg-warm-white rounded-xl border border-sand/40 hover:shadow-md transition-all duration-400">
                <div className="shrink-0 w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                  <span className="text-sm font-serif text-sage-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-warm-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
