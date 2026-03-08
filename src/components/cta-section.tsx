import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-8 px-4 sm:px-6 lg:px-8 mb-32">
      <div className="relative max-w-4xl mx-auto">
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center p-8 md:p-10 rounded-3xl border border-border bg-card/80 backdrop-blur-md">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-6 text-balance leading-tight">
            Ready to elevate your{" "}
            <span className="font-medium italic text-muted-foreground">
              wellhead integrity
            </span>
            ?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Speak with Fusion about VETCO GRAY equipment supply, installation support, maintenance planning, or subsea
            wellhead requirements for your next project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact">
              <button className="group inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-bexoni text-white font-semibold text-base md:text-lg hover:bg-bexoni/90 transition-all duration-300 hover:scale-105 shadow-2xl">
                Contact Our Wellhead Team
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
