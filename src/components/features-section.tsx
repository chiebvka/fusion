import { useEffect, useRef, useState } from "react"

const AnimatedWellStatusDemo = ({ isActive }: { isActive: boolean }) => {
  const [wells, setWells] = useState([
    { id: "W-01", status: "operational", visible: false },
    { id: "W-02", status: "operational", visible: false },
    { id: "W-03", status: "flagged", visible: false },
    { id: "W-04", status: "operational", visible: false },
    { id: "W-05", status: "repair", visible: false },
    { id: "W-06", status: "operational", visible: false },
  ])
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const scenarios = [
      ["operational", "operational", "flagged", "operational", "repair", "operational"],
      ["operational", "flagged", "operational", "operational", "operational", "flagged"],
      ["repair", "operational", "operational", "flagged", "operational", "operational"],
    ]

    const currentScenario = scenarios[cycleCount % scenarios.length]

    const timer = setTimeout(() => {
      setWells((prev) => prev.map((w) => ({ ...w, visible: false })))

      currentScenario.forEach((status, i) => {
        setTimeout(() => {
          setWells((prev) =>
            prev.map((w, idx) => (idx === i ? { ...w, status, visible: true } : w)),
          )
        }, 200 + i * 150)
      })

      setTimeout(() => setCycleCount((prev) => prev + 1), 5000)
    }, 0)

    return () => clearTimeout(timer)
  }, [isActive, cycleCount])

  const statusColor = (s: string) =>
    s === "operational" ? "bg-green-500" : s === "flagged" ? "bg-yellow-500" : "bg-red-500"

  return (
    <div className="bg-muted rounded-lg p-4 h-32 overflow-hidden relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-muted-foreground font-medium">Live</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {wells.map((well, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${
              well.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } bg-card`}
          >
            <div className={`w-2 h-2 rounded-full ${statusColor(well.status)}`} />
            <span className="text-xs text-card-foreground">{well.id}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Flagged</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Repair</span>
      </div>
    </div>
  )
}

const AnimatedPressureDemo = ({ isActive }: { isActive: boolean }) => {
  const [pressure, setPressure] = useState(0)
  const [target] = useState(3200)
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    if (!isActive) return

    let current = 0
    const interval = setInterval(() => {
      current += 80
      if (current >= target) {
        current = target
        clearInterval(interval)
        setTimeout(() => setPassed(true), 500)
      }
      setPressure(current)
    }, 50)

    return () => clearInterval(interval)
  }, [isActive, target])

  return (
    <div className="bg-muted rounded-lg p-4 h-32 flex flex-col justify-between relative">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground font-medium">Pressure Test</span>
        {passed && <span className="text-xs text-green-500 font-medium">PASS</span>}
      </div>
      <div className="flex-1 flex items-center">
        <div className="w-full">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{pressure} PSI</span>
            <span>{target} PSI</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                passed ? "bg-green-500" : "bg-bexoni"
              }`}
              style={{ width: `${(pressure / target) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const AnimatedMaintenanceDemo = ({ isActive }: { isActive: boolean }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const timer = setTimeout(() => {
      setSelectedDate(15)
      setTimeout(() => setConfirmed(true), 1500)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isActive])

  return (
    <div className="bg-muted rounded-lg p-4 h-32">
      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`w-4 h-4 flex items-center justify-center rounded transition-all duration-300 ${
              day === selectedDate
                ? confirmed
                  ? "bg-green-500 text-white scale-110"
                  : "bg-bexoni text-white scale-110"
                : day === 8 || day === 20
                  ? "bg-yellow-500/20 text-yellow-600"
                  : "bg-card text-card-foreground"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      {confirmed && (
        <div className="mt-2 text-xs text-green-600 font-medium animate-fade-in">&#10003; Maintenance scheduled for the 15th</div>
      )}
    </div>
  )
}

const AnimatedWorkOrderDemo = ({ isActive }: { isActive: boolean }) => {
  const [orders, setOrders] = useState([
    { ref: "WO-4821", task: "Valve replacement", status: "pending" },
    { ref: "WO-4822", task: "Integrity inspection", status: "pending" },
    { ref: "WO-4823", task: "Spool repair", status: "pending" },
  ])

  useEffect(() => {
    if (!isActive) return

    orders.forEach((_, index) => {
      setTimeout(
        () => {
          setOrders((prev) =>
            prev.map((order, i) => (i === index ? { ...order, status: "complete" } : order)),
          )
        },
        1000 + index * 800,
      )
    })
  }, [isActive])

  return (
    <div className="bg-muted rounded-lg p-4 h-32 overflow-hidden">
      <div className="space-y-2">
        {orders.map((order, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${
              order.status === "complete" ? "bg-green-500/10" : "bg-card"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${order.status === "complete" ? "bg-green-500" : "bg-bexoni"}`} />
            <span className="text-xs text-card-foreground flex-1">{order.ref} — {order.task}</span>
            {order.status === "complete" && (
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedInventoryDemo = ({ isActive }: { isActive: boolean }) => {
  const [parts, setParts] = useState([
    { name: "Gate Valves", stock: 0, max: 85 },
    { name: "Tubing Hangers", stock: 0, max: 62 },
    { name: "Seal Rings", stock: 0, max: 94 },
  ])

  useEffect(() => {
    if (!isActive) return

    parts.forEach((_, index) => {
      setTimeout(() => {
        const target = parts[index].max
        const interval = setInterval(() => {
          setParts((prev) =>
            prev.map((part, i) => {
              if (i === index && part.stock < target) {
                return { ...part, stock: Math.min(part.stock + 5, target) }
              }
              return part
            }),
          )
        }, 50)

        setTimeout(() => clearInterval(interval), 1000)
      }, index * 600)
    })
  }, [isActive])

  return (
    <div className="bg-muted rounded-lg p-4 h-32 overflow-hidden">
      <div className="space-y-2">
        {parts.map((part, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-card-foreground w-24 truncate">{part.name}</span>
            <div className="flex-1 bg-secondary rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  part.stock >= 80 ? "bg-green-500" : part.stock >= 50 ? "bg-bexoni" : "bg-yellow-500"
                }`}
                style={{ width: `${part.stock}%` }}
              />
            </div>
            <span className="text-xs font-medium w-8 text-right">{part.stock}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedComplianceDemo = ({ isActive }: { isActive: boolean }) => {
  const [certs, setCerts] = useState([
    { name: "ISO 9001", verified: false },
    { name: "API Q1", verified: false },
    { name: "OSHA", verified: false },
    { name: "NORSOK", verified: false },
  ])

  useEffect(() => {
    if (!isActive) return

    certs.forEach((_, index) => {
      setTimeout(
        () => {
          setCerts((prev) => prev.map((cert, i) => (i === index ? { ...cert, verified: true } : cert)))
        },
        500 + index * 400,
      )
    })
  }, [isActive])

  return (
    <div className="bg-muted rounded-lg p-4 h-32">
      <div className="grid grid-cols-2 gap-2">
        {certs.map((cert, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${
              cert.verified ? "bg-green-500/10" : "bg-card"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                cert.verified ? "bg-green-500" : "bg-muted-foreground/30"
              }`}
            />
            <span className="text-xs text-card-foreground">{cert.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs text-muted-foreground">{certs.filter((c) => c.verified).length}/4 verified</div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Well Status Monitoring",
    description:
      "Real-time visibility across your entire well portfolio. Track operational status, flag emerging issues, and prioritise interventions before they become costly shutdowns.",
    demo: AnimatedWellStatusDemo,
    size: "large",
  },
  {
    title: "Pressure Testing & Integrity",
    description:
      "Hydrostatic and pneumatic testing to verify wellhead integrity. Comprehensive reporting that keeps you compliant and your assets safe.",
    demo: AnimatedPressureDemo,
    size: "medium",
  },
  {
    title: "Maintenance Scheduling",
    description:
      "Preventive maintenance programs tailored to your asset base. Automated scheduling ensures nothing falls through the cracks.",
    demo: AnimatedMaintenanceDemo,
    size: "medium",
  },
  {
    title: "Work Order Management",
    description:
      "End-to-end tracking from job creation to completion. Every valve replacement, inspection, and repair documented and auditable.",
    demo: AnimatedWorkOrderDemo,
    size: "large",
  },
  {
    title: "Parts & Equipment Supply",
    description:
      "Pre-positioned critical spares and rapid procurement for all major wellhead manufacturers. No more waiting days for a part to arrive.",
    demo: AnimatedInventoryDemo,
    size: "medium",
  },
  {
    title: "Compliance & Certification",
    description:
      "Full regulatory compliance management across ISO, API, OSHA, and NORSOK standards. Audit-ready documentation at all times.",
    demo: AnimatedComplianceDemo,
    size: "medium",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeDemo, setActiveDemo] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative z-10">
      <div className="bg-background/80 backdrop-blur-md rounded-t-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-muted-foreground/20 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary border border-border text-secondary-foreground text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              24/7 Operations Support — Zero Compromise on Safety
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4 sm:mb-6">
              Your Wellheads{" "}
              <span className="bg-linear-to-r from-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent">
                Never Stop
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              See how Fusion keeps your operations running around the clock with real-time monitoring, preventive
              maintenance, and rapid-response field engineering.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ${feature.size === "large" ? "md:col-span-2" : ""}`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
                onMouseEnter={() => setActiveDemo(index)}
                onMouseLeave={() => setActiveDemo(null)}
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border hover:border-border/80">
                  <div className="mb-6">
                    <feature.demo isActive={activeDemo === index || isVisible} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 group-hover:text-card-foreground/80 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
