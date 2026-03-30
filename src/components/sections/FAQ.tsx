"use client";

import { useState } from "react";
import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-sand/60 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between gap-4 text-left group cursor-pointer"
      >
        <span className="font-serif text-lg md:text-xl text-charcoal group-hover:text-terracotta transition-colors duration-200">
          {question}
        </span>
        <span
          className={`shrink-0 mt-1 w-6 h-6 rounded-full border border-sand flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-terracotta border-terracotta rotate-45" : ""
          }`}
        >
          <svg
            className={`w-3 h-3 ${isOpen ? "text-white" : "text-warm-gray"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-warm-gray leading-relaxed text-sm md:text-base pr-12">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-36 bg-cream">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <SectionLabel>Questions</SectionLabel>
            <SectionHeading className="mt-4">
              Frequently Asked Questions
            </SectionHeading>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="mt-14 md:mt-18">
            {siteData.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
