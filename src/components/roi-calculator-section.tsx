import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ClipboardList, Layers3, LifeBuoy, ShieldCheck, Wrench } from "lucide-react"

interface ProjectScopeInputs {
  environment: string
  phase: string
  casingStrings: number
  pressureClass: number
}

interface SupportSelectorInputs {
  supportNeed: string
  operatingSetting: string
  assetStage: string
  responseWindow: string
  interventionLevel: number
}

const environmentCopy: Record<string, { system: string; execution: string; planning: string }> = {
  onshore: {
    system: "MS-700 wellhead housing package with casing hanger and seal planning.",
    execution: "Land-well installation support with running services and confirmation steps.",
    planning: "Structured for efficient field delivery and future maintenance access.",
  },
  offshore: {
    system: "Offshore wellhead package with H-4 connector planning and installation assurance.",
    execution: "Running tool support, landing confirmation, and controlled offshore execution.",
    planning: "Built around disciplined mobilisation and dependable installation windows.",
  },
  subsea: {
    system: "Integrated subsea wellhead assembly with tubing head spool and recoverable module readiness.",
    execution: "Orientation, lockdown, and deepwater installation support for subsea operations.",
    planning: "Focused on high-pressure subsea integrity and intervention-aware planning.",
  },
}

const phaseCopy: Record<string, { mix: string[]; summary: string }> = {
  development: {
    mix: ["Equipment supply alignment", "Installation & running services", "Landing and locking assurance"],
    summary: "Installation-led scope from planning through first execution.",
  },
  workover: {
    mix: ["Connector service support", "Seal and pack-off replacement", "Maintenance intervention planning"],
    summary: "Intervention-focused scope for producing assets and returning wells.",
  },
  upgrade: {
    mix: ["Component replacement planning", "Interface compatibility review", "Re-entry and recommissioning support"],
    summary: "Upgrade scope built around controlled change-out and asset continuity.",
  },
}

const supportModelCopy: Record<string, { model: string; inclusions: string[]; note: string }> = {
  supply: {
    model: "Specification-led equipment supply support",
    inclusions: ["MS-700 and casing hanger focus", "Connector family selection", "Project-ready equipment coordination"],
    note: "Best fit when the priority is equipment readiness before field execution begins.",
  },
  installation: {
    model: "Installation and running services package",
    inclusions: ["Running tool coordination", "Landing and locking confirmation", "Field execution support"],
    note: "Best fit for active installation windows where execution assurance matters most.",
  },
  maintenance: {
    model: "Maintenance and workover support package",
    inclusions: ["Connector reconditioning", "Seal assembly change-out", "Planned intervention support"],
    note: "Best fit for producing assets that need lifecycle support and integrity-focused upkeep.",
  },
  subsea: {
    model: "Subsea project support package",
    inclusions: ["Deepwater installation planning", "Tubing head spool support", "Recoverable module readiness"],
    note: "Best fit for subsea campaigns where pressure integrity and orientation control are critical.",
  },
  emergency: {
    model: "24/7 critical response support",
    inclusions: ["Rapid escalation path", "Priority engineering coordination", "Critical operations support"],
    note: "Best fit when operational urgency requires immediate response planning.",
  },
}

const responseCopy: Record<string, string> = {
  planned: "Planned support cadence with scheduled engineering and field coordination.",
  expedited: "Accelerated support path for compressed delivery or turnaround windows.",
  critical: "24/7 critical operations posture with urgent escalation and response planning.",
}

export function ROICalculatorSection() {
  const [projectScope, setProjectScope] = useState<ProjectScopeInputs>({
    environment: "offshore",
    phase: "development",
    casingStrings: 3,
    pressureClass: 10000,
  })
  const [supportSelector, setSupportSelector] = useState<SupportSelectorInputs>({
    supportNeed: "maintenance",
    operatingSetting: "producing",
    assetStage: "brownfield",
    responseWindow: "planned",
    interventionLevel: 3,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const firstSection = document.getElementById("project-scope-planner")
    if (firstSection) {
      observer.observe(firstSection)
    }

    return () => observer.disconnect()
  }, [])

  const scopeConfig = environmentCopy[projectScope.environment] || environmentCopy.offshore
  const phaseConfig = phaseCopy[projectScope.phase] || phaseCopy.development
  const supportConfig = supportModelCopy[supportSelector.supportNeed] || supportModelCopy.maintenance
  const pressureBand =
    projectScope.pressureClass >= 15000 ? "15,000 psi class" : `${projectScope.pressureClass.toLocaleString()} psi class`

  const projectHeadline =
    projectScope.phase === "development"
      ? "Install"
      : projectScope.phase === "workover"
        ? "Maintain"
        : "Upgrade"

  return (
    <div className="space-y-16 md:space-y-20">
      <section id="project-scope-planner" className="py-16 md:py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-sm mb-6">
              <ClipboardList className="w-4 h-4 text-bexoni" />
              <span className="text-sm font-medium text-muted-foreground">Project Scope Planner</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance">
              Shape the right <span className="text-muted-foreground">wellhead project scope</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Outline the operating environment and project phase to see the service mix Fusion can align around your
              wellhead requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <div
              className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Card className="p-6 md:p-8 bg-card/80 border-border backdrop-blur-sm shadow-2xl h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">Project Inputs</h3>

                <div className="space-y-8 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">Project Environment</label>
                    <Select
                      value={projectScope.environment}
                      onValueChange={(value) => setProjectScope((prev) => ({ ...prev, environment: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="onshore">Onshore</SelectItem>
                        <SelectItem value="offshore">Offshore</SelectItem>
                        <SelectItem value="subsea">Subsea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">Project Phase</label>
                    <Select
                      value={projectScope.phase}
                      onValueChange={(value) => setProjectScope((prev) => ({ ...prev, phase: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="development">New Development</SelectItem>
                        <SelectItem value="workover">Workover</SelectItem>
                        <SelectItem value="upgrade">Upgrade / Replacement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">
                      Casing Strings: <span className="text-foreground font-semibold">{projectScope.casingStrings}</span>
                    </label>
                    <Slider
                      value={[projectScope.casingStrings]}
                      onValueChange={([value]) => setProjectScope((prev) => ({ ...prev, casingStrings: value }))}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                      <span>1</span>
                      <span>5</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">
                      Pressure Class: <span className="text-foreground font-semibold">{projectScope.pressureClass.toLocaleString()} psi</span>
                    </label>
                    <Slider
                      value={[projectScope.pressureClass]}
                      onValueChange={([value]) => setProjectScope((prev) => ({ ...prev, pressureClass: value }))}
                      max={15000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                      <span>5,000 psi</span>
                      <span>15,000 psi</span>
                    </div>
                  </div>

                  <div className="flex-1"></div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Planning Focus</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                        <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Primary system focus:</span> {scopeConfig.system}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                        <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Execution focus:</span> {scopeConfig.execution}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                        <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Project summary:</span> {phaseConfig.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div
              className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Card className="p-6 md:p-8 bg-card/80 border-border backdrop-blur-sm shadow-2xl h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">
                  Recommended Scope Direction
                </h3>

                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 rounded-lg bg-secondary/50">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Environment</div>
                      <div className="text-xl md:text-2xl font-bold text-foreground capitalize">{projectScope.environment}</div>
                      <div className="text-xs text-muted-foreground/60">Project base</div>
                    </div>
                    <div className="text-center p-3 md:p-4 rounded-lg bg-bexoni/10 border border-bexoni/20">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Pressure Class</div>
                      <div className="text-xl md:text-2xl font-bold text-foreground">{pressureBand}</div>
                      <div className="text-xs text-muted-foreground">Scope marker</div>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                      <div className="flex items-center gap-3">
                        <Layers3 className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <span className="text-sm md:text-base text-foreground">Recommended Equipment Focus</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-right text-foreground max-w-[240px]">{scopeConfig.system}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <span className="text-sm md:text-base text-foreground">Installation Focus</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-right text-foreground max-w-[240px]">{scopeConfig.execution}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                      <div className="flex items-center gap-3">
                        <Wrench className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <span className="text-sm md:text-base text-foreground">Service Mix</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-right text-foreground max-w-[240px]">{phaseConfig.mix.join(" • ")}</span>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-lg bg-foreground/5 border border-border">
                    <div className="text-center">
                      <div className="text-xs md:text-sm text-muted-foreground mb-2">Scope Summary</div>
                      <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {projectScope.casingStrings} String / {projectHeadline}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">
                        {scopeConfig.planning} The current phase emphasizes {phaseConfig.mix[0].toLowerCase()}.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="wellhead-support-selector" className="py-4 md:py-6 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-sm mb-6">
              <LifeBuoy className="w-4 h-4 text-bexoni" />
              <span className="text-sm font-medium text-muted-foreground">Wellhead Support Selector</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance">
              Match the right <span className="text-muted-foreground">support model to the job</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Select the operational priority and response conditions to see how Fusion can frame supply,
              installation, maintenance, or subsea assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <div
              className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Card className="p-6 md:p-8 bg-card/80 border-border backdrop-blur-sm shadow-2xl h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">Support Inputs</h3>

                <div className="space-y-8 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">Primary Support Need</label>
                    <Select
                      value={supportSelector.supportNeed}
                      onValueChange={(value) => setSupportSelector((prev) => ({ ...prev, supportNeed: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="supply">Equipment Supply</SelectItem>
                        <SelectItem value="installation">Installation & Running</SelectItem>
                        <SelectItem value="maintenance">Maintenance & Workover</SelectItem>
                        <SelectItem value="subsea">Subsea Support</SelectItem>
                        <SelectItem value="emergency">Critical Response</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">Operating Setting</label>
                    <Select
                      value={supportSelector.operatingSetting}
                      onValueChange={(value) => setSupportSelector((prev) => ({ ...prev, operatingSetting: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="producing">Producing Asset</SelectItem>
                        <SelectItem value="campaign">Planned Campaign</SelectItem>
                        <SelectItem value="newbuild">New Build / New Well</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">Asset Stage</label>
                    <Select
                      value={supportSelector.assetStage}
                      onValueChange={(value) => setSupportSelector((prev) => ({ ...prev, assetStage: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="greenfield">Greenfield</SelectItem>
                        <SelectItem value="brownfield">Brownfield</SelectItem>
                        <SelectItem value="mature">Mature Asset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">Response Window</label>
                    <Select
                      value={supportSelector.responseWindow}
                      onValueChange={(value) => setSupportSelector((prev) => ({ ...prev, responseWindow: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="expedited">Expedited</SelectItem>
                        <SelectItem value="critical">24/7 Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-3">
                      Intervention Level: <span className="text-foreground font-semibold">{supportSelector.interventionLevel}/5</span>
                    </label>
                    <Slider
                      value={[supportSelector.interventionLevel]}
                      onValueChange={([value]) => setSupportSelector((prev) => ({ ...prev, interventionLevel: value }))}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                      <span>Routine</span>
                      <span>High Complexity</span>
                    </div>
                  </div>

                  <div className="flex-1"></div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Selection Notes</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                        <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Recommended model:</span> {supportConfig.model}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                        <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Response posture:</span> {responseCopy[supportSelector.responseWindow]}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                        <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Support note:</span> {supportConfig.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div
              className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Card className="p-6 md:p-8 bg-card/80 border-border backdrop-blur-sm shadow-2xl h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">
                  Support Model Summary
                </h3>

                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 rounded-lg bg-secondary/50">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Priority</div>
                      <div className="text-xl md:text-2xl font-bold text-foreground capitalize">{supportSelector.supportNeed}</div>
                      <div className="text-xs text-muted-foreground/60">Support type</div>
                    </div>
                    <div className="text-center p-3 md:p-4 rounded-lg bg-bexoni/10 border border-bexoni/20">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Response Window</div>
                      <div className="text-xl md:text-2xl font-bold text-foreground capitalize">{supportSelector.responseWindow}</div>
                      <div className="text-xs text-muted-foreground">Delivery cadence</div>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                      <div className="flex items-center gap-3">
                        <LifeBuoy className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <span className="text-sm md:text-base text-foreground">Selected Model</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-right text-foreground max-w-[240px]">{supportConfig.model}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                      <div className="flex items-center gap-3">
                        <ClipboardList className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <span className="text-sm md:text-base text-foreground">Likely Inclusions</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-right text-foreground max-w-[240px]">{supportConfig.inclusions.join(" • ")}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <span className="text-sm md:text-base text-foreground">Operating Context</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-right text-foreground max-w-[240px] capitalize">
                        {supportSelector.operatingSetting} / {supportSelector.assetStage}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-lg bg-foreground/5 border border-border">
                    <div className="text-center">
                      <div className="text-xs md:text-sm text-muted-foreground mb-2">Support Summary</div>
                      <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Level {supportSelector.interventionLevel} / {supportSelector.responseWindow === "critical" ? "24/7" : "Planned"}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">
                        Fusion can frame this requirement around {supportConfig.model.toLowerCase()}, with emphasis on{" "}
                        {supportConfig.inclusions[0].toLowerCase()} and a {responseCopy[supportSelector.responseWindow].toLowerCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
