"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function MainServices() {
  const { mainServices } = siteData;

  return (
    <section id="services" className="py-24 md:py-36 bg-warm-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionLabel>What I Offer</SectionLabel>
            <SectionHeading subtitle={mainServices.subtitle} className="mt-4">
              {mainServices.headline}
            </SectionHeading>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mainServices.items.map((service, i) => (
            <AnimateOnScroll key={i} delay={i * 120}>
              <div className="group relative h-full flex flex-col p-8 md:p-10 bg-cream rounded-2xl border border-sand/40 hover:bg-forest hover:border-forest transition-all duration-500">
                {/* Number */}
                <span className="text-5xl font-serif text-sand group-hover:text-sage/30 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 font-serif text-2xl md:text-3xl text-charcoal group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>

                <p className="mt-4 text-warm-gray group-hover:text-sage-light leading-relaxed text-sm md:text-base transition-colors duration-500 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-2 pt-6 border-t border-sand/40 group-hover:border-sage/20 transition-colors duration-500">
                  {service.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-warm-gray group-hover:text-sage-light transition-colors duration-500"
                    >
                      <svg
                        className="w-4 h-4 text-terracotta group-hover:text-terracotta-light transition-colors duration-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  size="sm"
                  href={siteData.bookingUrl}
                  className="mt-8 self-start group-hover:border-white group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-forest transition-all duration-500"
                >
                  Learn More
                </Button>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
