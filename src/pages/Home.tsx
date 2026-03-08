import { CTASection } from "@/components/cta-section"
import { FeaturesSection } from "@/components/features-section"
import { HeroSection } from "@/components/hero"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <div className="-mt-20 md:-mt-24">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ROICalculatorSection />
      <CTASection />
    </div>
  )
}
