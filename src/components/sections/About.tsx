"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export function About() {
  const { about } = siteData;

  return (
    <section id="about" className="py-24 md:py-36 bg-warm-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image placeholder — editorial asymmetric crop */}
          <AnimateOnScroll>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-cream overflow-hidden">
                {/* Warm placeholder with initials — replace with real photo */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sage/20 to-cream">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-sage/20 flex items-center justify-center">
                      <span className="font-serif text-4xl text-sage-dark">
                        AZ
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-warm-gray">
                      Photo of Albán Zamora
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-terracotta/10 -z-10" />
            </div>
          </AnimateOnScroll>

          {/* Text content */}
          <AnimateOnScroll delay={150}>
            <div>
              <SectionLabel>About</SectionLabel>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
                {about.headline}
              </h2>

              <div className="mt-8 space-y-5">
                {about.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-charcoal-light leading-relaxed text-base md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Credentials */}
              <div className="mt-8 pt-8 border-t border-sand">
                <ul className="space-y-2">
                  {about.credentials.map((cred, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-warm-gray"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                href={siteData.bookingUrl}
                className="mt-8"
              >
                Schedule a Free Consultation
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
