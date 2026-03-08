import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "./testimonials-column"

export function TestimonialsSection() {
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
              }, index * 300)
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

  const testimonials = [
    {
      text: "Fusion had a team on-site within 4 hours of our call. The wellhead was back in service before we lost a full day of production. That kind of response time is invaluable offshore.",
      name: "James McAllister",
      role: "Operations Manager",
    },
    {
      text: "We consolidated three separate wellhead contractors into one relationship with Fusion. Simpler, faster, and safer — our procurement team couldn't be happier.",
      name: "Sarah O'Brien",
      role: "Asset Manager",
    },
    {
      text: "Their pressure testing program identified two integrity issues we'd have missed in our routine inspections. That kind of thoroughness protects lives and assets.",
      name: "David Kowalski",
      role: "HSE Director",
    },
    {
      text: "Since switching to Fusion for our wellhead maintenance, unplanned downtime has dropped by 60%. The preventive maintenance program pays for itself many times over.",
      name: "Michael Torres",
      role: "Production Engineer",
    },
    {
      text: "Fusion's engineers understand the urgency of production schedules. They don't just fix problems — they anticipate them. Our platform uptime has never been better.",
      name: "Karen Walsh",
      role: "Field Supervisor",
    },
    {
      text: "The parts supply chain alone was worth the switch. Fusion keeps critical spares pre-positioned so we're never waiting days for a valve or spool to arrive.",
      name: "Robert Chen",
      role: "Drilling Manager",
    },
    {
      text: "We've worked with Fusion on three decommissioning campaigns now. Their safety record is impeccable and their regulatory knowledge saves us weeks of compliance headaches.",
      name: "Lisa Thompson",
      role: "Decommissioning Lead",
    },
    {
      text: "What sets Fusion apart is their people. Every engineer they've sent to our site has had deep hands-on experience — not just textbook knowledge. You can't fake that.",
      name: "Patrick Gallagher",
      role: "Maintenance Superintendent",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-muted-foreground text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-border"></div>
            Client Testimonials
            <div className="w-8 h-px bg-border"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-8 tracking-tight text-balance">
            The operators we <span className="font-medium italic">empower</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover how leading operators are protecting production and reducing downtime with Fusion's wellhead solutions
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
