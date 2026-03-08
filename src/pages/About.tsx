import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Wrench, Gauge, Package, Phone, ShieldCheck, HardHat } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function SystemStatus() {
  const [dots, setDots] = useState([true, true, true, false, true])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => prev.map(() => Math.random() > 0.2))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {dots.map((active, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${active ? "bg-emerald-500" : "bg-muted"}`}
          animate={active ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

function AnimatedPressureChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const points = [
    { x: 0, y: 50 },
    { x: 15, y: 35 },
    { x: 30, y: 45 },
    { x: 45, y: 20 },
    { x: 60, y: 30 },
    { x: 75, y: 15 },
    { x: 100, y: 25 },
  ]

  const pathD = points.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`
  }, "")

  return (
    <svg ref={ref} viewBox="0 0 100 70" className="w-full h-24">
      <defs>
        <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(153,72,251)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(153,72,251)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {isInView && (
        <>
          <path d={`${pathD} L 100 70 L 0 70 Z`} fill="url(#pressureGradient)" className="opacity-50" />
          <path d={pathD} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-bexoni" />
        </>
      )}
    </svg>
  )
}

export default function About() {
  const gridRef = useRef(null)
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" })

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        {/* Page Header */}
        <section className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-bexoni">
            About Fusion Limited
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            A specialist wellhead solutions partner serving the oil and gas industry. We deliver expert maintenance,
            repair, and integrity services that keep your operations running safely and on schedule.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "24/7", label: "Emergency Response" },
            { value: "99.8%", label: "Safety Record" },
          ].map((stat) => (
            <div key={stat.label} className="border border-border p-6 bg-card/80 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-bexoni mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Bento Grid - Services */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to stay operational
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Comprehensive wellhead services under one roof. From routine maintenance to emergency intervention,
              Fusion has you covered.
            </p>
          </motion.div>

          <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Large card - Wellhead Maintenance */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="p-2 bg-bexoni/10 w-fit mb-4">
                    <Wrench className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Wellhead Maintenance & Repair</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Comprehensive maintenance programs and rapid repair services for all major wellhead systems. We keep
                    your assets performing at peak efficiency.
                  </p>
                </div>
                <SystemStatus />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { value: "98%", label: "Uptime" },
                  { value: "4hr", label: "Avg Response" },
                  { value: "250+", label: "Wells Serviced" },
                  { value: "0", label: "Incidents" },
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                    <div className="text-xs text-muted-foreground/60">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pressure Testing */}
            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <Gauge className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Pressure Testing</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Hydrostatic and pneumatic testing to verify wellhead integrity and regulatory compliance.
              </p>
              <AnimatedPressureChart />
            </motion.div>

            {/* Equipment Supply */}
            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <Package className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Equipment Supply</h3>
              <p className="text-muted-foreground text-sm mb-4">
                OEM and aftermarket parts sourced and delivered for all major wellhead manufacturers.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Valves", "Spools", "Hangers", "Seals", "Adapters"].map((part) => (
                  <span key={part} className="px-2 py-1 text-xs bg-secondary text-muted-foreground">{part}</span>
                ))}
              </div>
            </motion.div>

            {/* Emergency Response */}
            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <Phone className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Emergency Response</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Round-the-clock mobilisation for critical wellhead incidents. Our teams are ready when you need them most.
              </p>
              <div className="flex items-center gap-2 text-emerald-500 text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-mono">Online</span>
                <span className="text-muted-foreground/60">— always available</span>
              </div>
            </motion.div>

            {/* Safety & Compliance */}
            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <ShieldCheck className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Safety & Compliance</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Full regulatory compliance management and safety-first operations across every project.
              </p>
              <div className="flex items-center gap-2">
                {["ISO 9001", "API Q1", "OSHA"].map((cert) => (
                  <span key={cert} className="px-2 py-1 text-xs bg-secondary text-muted-foreground">{cert}</span>
                ))}
              </div>
            </motion.div>

            {/* Field Engineering */}
            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <HardHat className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Field Engineering</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Experienced engineers deployed on-site for installation, commissioning, and troubleshooting.
              </p>
              <div className="flex items-center gap-2 text-bexoni text-sm">
                <span className="font-mono">50+</span>
                <span className="text-muted-foreground/60">field engineers worldwide</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Project Showcase Cards */}
        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Projects & Capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Offshore Platform Overhaul",
                description: "Complete wellhead system replacement and integrity restoration for a 12-well offshore platform in the North Sea.",
                tag: "Offshore",
              },
              {
                title: "Emergency Valve Replacement",
                description: "Critical gate valve failure resolved within 6 hours of initial call, preventing estimated €2M in production losses.",
                tag: "Emergency",
              },
              {
                title: "Multi-Well Pressure Testing",
                description: "Systematic pressure testing program across 40+ wells, identifying and resolving 8 integrity concerns before failure.",
                tag: "Testing",
              },
              {
                title: "Brownfield Wellhead Upgrade",
                description: "Modernisation of legacy wellhead equipment across an ageing onshore field, extending asset life by 15+ years.",
                tag: "Upgrade",
              },
              {
                title: "Subsea Wellhead Support",
                description: "Specialist tooling and engineering support for subsea wellhead installation and commissioning campaigns.",
                tag: "Subsea",
              },
              {
                title: "Decommissioning Services",
                description: "Safe and compliant wellhead removal and site restoration for end-of-life assets across multiple facilities.",
                tag: "Decommission",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="border border-border bg-card/80 backdrop-blur-sm overflow-hidden hover:border-bexoni/40 transition-colors group"
              >
                <div className="aspect-video bg-secondary/50 flex items-center justify-center">
                  <span className="text-muted-foreground/40 text-sm">Image placeholder</span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-medium bg-bexoni/10 text-bexoni">{project.tag}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Fusion */}
        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose <span className="text-bexoni">Fusion</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                title: "Single-Source Partner",
                description: "One point of contact for maintenance, repair, testing, and equipment — no more juggling multiple contractors.",
              },
              {
                title: "Rapid Mobilisation",
                description: "Our teams can be on-site within hours, not days. We maintain strategic stock and pre-positioned resources.",
              },
              {
                title: "Deep Technical Expertise",
                description: "Our engineers have decades of hands-on experience across every major wellhead platform and operating environment.",
              },
              {
                title: "Safety-First Culture",
                description: "Zero-incident target across all operations. Our safety record speaks for itself — and our clients' audit results confirm it.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-border p-6 bg-card/80 backdrop-blur-sm space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
