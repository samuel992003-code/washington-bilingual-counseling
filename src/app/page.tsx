import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { AreasOfFocus } from "@/components/sections/AreasOfFocus";
import { MainServices } from "@/components/sections/MainServices";
import { AdditionalServices } from "@/components/sections/AdditionalServices";
import { Credentials } from "@/components/sections/Credentials";
import { FeaturedIn } from "@/components/sections/FeaturedIn";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <AreasOfFocus />
        <MainServices />
        <AdditionalServices />
        <Credentials />
        <FeaturedIn />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <BlogTeaser />
      </main>
      <Footer />
    </>
  );
}
