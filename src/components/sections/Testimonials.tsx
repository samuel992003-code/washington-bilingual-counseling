"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const { testimonials } = siteData;

  return (
    <section id="testimonials" className="py-24 md:py-36 bg-warm-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionLabel>Client Stories</SectionLabel>
            <SectionHeading className="mt-4">
              Words That Mean the Most
            </SectionHeading>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="relative h-full p-8 md:p-10 bg-cream rounded-2xl border border-sand/40">
                {/* Quote mark */}
                <svg
                  className="absolute top-6 right-8 w-10 h-10 text-terracotta/10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>

                <blockquote className="relative">
                  <p className="font-serif text-lg md:text-xl text-charcoal leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                      <span className="text-sm font-medium text-sage-dark">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-medium text-charcoal">
                        {testimonial.author}
                      </cite>
                      <p className="text-xs text-warm-gray mt-0.5">
                        {testimonial.context}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
