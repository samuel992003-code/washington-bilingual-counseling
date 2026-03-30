"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AreasOfFocus() {
  const { areasOfFocus } = siteData;

  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionLabel>Specializations</SectionLabel>
            <SectionHeading
              subtitle={areasOfFocus.subtitle}
              className="mt-4"
            >
              {areasOfFocus.headline}
            </SectionHeading>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {areasOfFocus.items.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 80}>
              <div className="group p-8 md:p-10 bg-warm-white rounded-2xl border border-sand/60 hover:border-sage/30 hover:shadow-lg transition-all duration-500">
                {/* Decorative number */}
                <span className="text-xs font-mono text-terracotta/50 tracking-wider">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl md:text-2xl text-charcoal group-hover:text-forest transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-warm-gray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
