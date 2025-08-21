import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/TestiMonials";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
