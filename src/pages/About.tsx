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
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
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
    { x: 15, y: 40 },
    { x: 30, y: 42 },
    { x: 45, y: 22 },
    { x: 60, y: 28 },
    { x: 75, y: 18 },
    { x: 100, y: 22 },
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
        <section className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-bexoni">
            About Fusion Limited
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Fusion Limited is a specialist wellhead solutions partner serving the Nigerian oil and gas sector through
            VETCO GRAY equipment supply, installation support, maintenance planning, and subsea project capability.
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "24/7", label: "Critical Operations Support" },
            { value: "15,000 psi+", label: "Subsea Pressure Capability" },
            { value: "1,000+", label: "Partner Brand Subsea Track Record" },
            { value: "100+ yrs", label: "Wellhead Innovation Heritage" },
          ].map((stat) => (
            <div key={stat.label} className="border border-border p-6 bg-card/80 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-bexoni mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lifecycle wellhead support under one roof
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              From equipment specification to installation assurance, maintenance, workover support, and subsea
              readiness, Fusion delivers wellhead services around the full operating lifecycle.
            </p>
          </motion.div>

          <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="p-2 bg-bexoni/10 w-fit mb-4">
                    <Package className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Authorized VETCO GRAY Wellhead Solutions</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Fusion combines local project accountability with VETCO GRAY technology across wellhead housings,
                    casing hangers, seal systems, connectors, installation tooling, and subsea support requirements.
                  </p>
                </div>
                <SystemStatus />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { value: "MS-700", label: "Housing Family" },
                  { value: "MS-1", label: "Metal Seal" },
                  { value: "H-4", label: "Connector Series" },
                  { value: "SHD", label: "Critical Service" },
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                    <div className="text-xs text-muted-foreground/60">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <HardHat className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Installation & Running Services</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Trained personnel support running tools, landing confirmation, orientation, and locking for safer,
                more controlled field execution.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Running Tools", "Landing", "Orientation", "Lockdown"].map((item) => (
                  <span key={item} className="px-2 py-1 text-xs bg-secondary text-muted-foreground">{item}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <Gauge className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Subsea Wellhead Systems</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Deepwater and subsea solutions including high-capacity housings, tubing head spools, and connectors
                designed for demanding pressure environments.
              </p>
              <AnimatedPressureChart />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <Wrench className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Maintenance & Workover</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Extend well life with structured maintenance support, component service planning, and workover-focused
                intervention assistance.
              </p>
              <div className="flex items-center gap-2 text-bexoni text-sm">
                <span className="font-mono">Lifecycle</span>
                <span className="text-muted-foreground/60">support for producing assets</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <ShieldCheck className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Connector Reconditioning</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Support for inspection and refurbishment of H-4 connectors, hydraulic circuits, preload mechanisms,
                and associated integrity-critical components.
              </p>
              <div className="flex items-center gap-2">
                {["H-4", "Hydraulics", "Preload"].map((item) => (
                  <span key={item} className="px-2 py-1 text-xs bg-secondary text-muted-foreground">{item}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group relative p-6 border border-border bg-card/80 backdrop-blur-sm hover:border-bexoni/40 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2 bg-bexoni/10 w-fit mb-4">
                <Phone className="w-5 h-5 text-bexoni" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Seal & Module Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Replacement of seal assemblies and support for recoverable modules that contain valves and sensors,
                helping reduce full retrieval requirements.
              </p>
              <div className="flex items-center gap-2 text-emerald-500 text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-mono">24/7</span>
                <span className="text-muted-foreground/60">critical operations support</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Applications & Capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Standard Land Well Programs",
                description: "Flexible wellhead solutions configured for standard land drilling campaigns and adaptable casing programs.",
                tag: "Onshore",
                img: "/image1.jpg",
              },
              {
                title: "Offshore Development Projects",
                description: "Installation planning and wellhead execution support tailored for controlled offshore project delivery.",
                tag: "Offshore",
                img: "/image2.jpg",
              },
              {
                title: "HPHT Wellhead Integrity",
                description: "Advanced materials and metal-to-metal sealing concepts suited to higher pressure and temperature demands.",
                tag: "HPHT",
                img: "/image3.jpg",
              },
              {
                title: "Deepwater & Subsea Installations",
                description: "Support for subsea wellhead systems, tubing head spools, tieback connectors, and deepwater execution needs.",
                tag: "Subsea",
                img: "/image4.jpg",
              },
              {
                title: "Workover & Intervention Campaigns",
                description: "Maintenance-led support for re-entry, component change-out, seal replacement, and integrity restoration.",
                tag: "Workover",
                img: "/image5.jpg",
              },
              {
                title: "Recoverable Module Operations",
                description: "Module retrieval and service support for annulus monitoring and valve/sensor access without full system recovery.",
                tag: "Monitoring",
                img: "/image6.jpg",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="border border-border bg-card/80 backdrop-blur-sm overflow-hidden hover:border-bexoni/40 transition-colors group"
              >
                <div className="aspect-video bg-secondary/50 flex items-center justify-center">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
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

        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose <span className="text-bexoni">Fusion</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                title: "Metallurgy & Sealing Advantage",
                description: "Advanced materials and metal-to-metal sealing concepts help support pressure integrity in demanding well environments.",
              },
              {
                title: "Deepwater Engineering Focus",
                description: "Connector and subsea system support is framed around the realities of offshore loading, installation control, and deepwater execution.",
              },
              {
                title: "System Versatility",
                description: "Interchangeable components and broad configuration flexibility support projects ranging from standard land wells to complex subsea completions.",
              },
              {
                title: "Installation Assurance",
                description: "Positive indication tools and confirmation-driven execution help reduce guesswork during landing, locking, and critical running operations.",
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
