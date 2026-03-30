"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function HowItWorks() {
  const { howItWorks } = siteData;

  return (
    <section id="how-it-works" className="py-24 md:py-36 bg-forest text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionLabel className="!text-terracotta-light">
              Getting Started
            </SectionLabel>
            <div className="max-w-2xl mx-auto mt-4">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                {howItWorks.headline}
              </h2>
              <p className="mt-5 text-sage-light text-base md:text-lg leading-relaxed">
                {howItWorks.subtitle}
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {howItWorks.steps.map((step, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="relative">
                {/* Connector line on desktop */}
                {i < howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-sage/20 -translate-x-1/2" />
                )}

                <span className="block font-serif text-6xl md:text-7xl text-sage/20 leading-none">
                  {step.number}
                </span>
                <h3 className="mt-4 font-serif text-xl md:text-2xl text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sage-light text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={300}>
          <div className="mt-16 md:mt-20 text-center">
            <Button
              variant="primary"
              size="lg"
              href={siteData.bookingUrl}
            >
              Book Your Free Consultation
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
