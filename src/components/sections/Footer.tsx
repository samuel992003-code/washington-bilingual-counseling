import { siteData } from "@/lib/site-data";
import { Button } from "@/components/ui/Button";

const footerLinks = {
  services: [
    { label: "Individual Therapy", href: "#services" },
    { label: "Couples Counseling", href: "#services" },
    { label: "Family Therapy", href: "#services" },
    { label: "Group Therapy", href: "#services" },
  ],
  company: [
    { label: "About Albán", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "#blog" },
    { label: "FAQ", href: "#faq" },
  ],
  connect: [
    { label: "Book a Consultation", href: siteData.bookingUrl },
    { label: "Psychology Today Profile", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

export function Footer() {
  const { footer } = siteData;

  return (
    <footer className="bg-charcoal text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-2xl mx-auto">
            Ready to Take the First Step?
          </h2>
          <p className="mt-5 text-warm-gray-light text-base md:text-lg max-w-lg mx-auto">
            Your healing journey begins with a conversation. Book a free
            15-minute consultation — no pressure, no commitment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href={siteData.bookingUrl}>
              Schedule a Free Consultation
            </Button>
            <Button
              variant="ghost"
              href={`tel:${siteData.phone}`}
              className="!text-warm-gray-light hover:!text-white"
            >
              Or call {siteData.phone}
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-serif text-xl text-white">
              {siteData.name}
            </span>
            <p className="mt-4 text-sm text-warm-gray-light leading-relaxed">
              {footer.tagline}
            </p>
            <p className="mt-4 text-xs text-warm-gray">{footer.hours}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-gray mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-light hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-gray mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-light hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-gray mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-light hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray">
            &copy; {new Date().getFullYear()} {siteData.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-warm-gray text-center md:text-right max-w-md">
            {footer.emergency}
          </p>
        </div>
      </div>
    </footer>
  );
}
