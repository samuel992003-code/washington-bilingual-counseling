"use client";

import { siteData } from "@/lib/site-data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BlogTeaser() {
  const { blog } = siteData;

  return (
    <section id="blog" className="py-24 md:py-36 bg-warm-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionLabel>Insights</SectionLabel>
              <SectionHeading align="left" className="mt-4">
                {blog.headline}
              </SectionHeading>
            </div>
            <a
              href="#"
              className="text-sm text-terracotta hover:text-terracotta-dark transition-colors underline underline-offset-4 decoration-1 shrink-0"
            >
              View All Articles &rarr;
            </a>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 md:mt-18 grid grid-cols-1 md:grid-cols-3 gap-8">
          {blog.posts.map((post, i) => (
            <AnimateOnScroll key={i} delay={i * 120}>
              <article className="group cursor-pointer">
                {/* Image placeholder */}
                <div className="aspect-[16/10] rounded-xl bg-cream overflow-hidden mb-5">
                  <div className="w-full h-full bg-gradient-to-br from-sage/10 to-sand/30 group-hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-terracotta">
                    {post.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-sand" />
                  <span className="text-xs text-warm-gray">{post.date}</span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-terracotta transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm text-warm-gray leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
