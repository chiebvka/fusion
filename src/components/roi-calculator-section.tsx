import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { TrendingUp, Clock, DollarSign, ShieldCheck } from "lucide-react"

interface CalculatorInputs {
  activeWells: number
  currentDowntime: number
  dailyProductionValue: number
  operationType: string
}

export function ROICalculatorSection() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    activeWells: 20,
    currentDowntime: 5,
    dailyProductionValue: 50000,
    operationType: "offshore",
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

    const section = document.getElementById("roi-calculator")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const operationDefaults: Record<string, { downtimeReduction: number; responseTime: string; safetyImprovement: number; maxProduction: number }> = {
    offshore: { downtimeReduction: 60, responseTime: "4 hrs", safetyImprovement: 45, maxProduction: 200000 },
    onshore: { downtimeReduction: 55, responseTime: "2 hrs", safetyImprovement: 40, maxProduction: 100000 },
    subsea: { downtimeReduction: 50, responseTime: "8 hrs", safetyImprovement: 50, maxProduction: 300000 },
    platform: { downtimeReduction: 65, responseTime: "3 hrs", safetyImprovement: 48, maxProduction: 250000 },
    fpso: { downtimeReduction: 55, responseTime: "6 hrs", safetyImprovement: 42, maxProduction: 180000 },
  }

  const config = operationDefaults[inputs.operationType] || operationDefaults.offshore

  const handleOperationTypeChange = (value: string) => {
    const defaults = operationDefaults[value] || operationDefaults.offshore
    setInputs((prev) => ({ ...prev, operationType: value, dailyProductionValue: Math.min(prev.dailyProductionValue, defaults.maxProduction) }))
  }

  const annualDowntimeDays = (inputs.activeWells * inputs.currentDowntime * 365) / 100
  const currentAnnualLoss = annualDowntimeDays * inputs.dailyProductionValue
  const reducedDowntimeDays = annualDowntimeDays * (1 - config.downtimeReduction / 100)
  const improvedAnnualLoss = reducedDowntimeDays * inputs.dailyProductionValue
  const annualSavings = currentAnnualLoss - improvedAnnualLoss
  const downtimePrevented = Math.round(annualDowntimeDays - reducedDowntimeDays)

  return (
    <section id="roi-calculator" className="py-16 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-bexoni" />
            <span className="text-sm font-medium text-muted-foreground">Downtime Cost Calculator</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance">
            See how much downtime{" "}
            <span className="text-muted-foreground">
              is costing you
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Calculate how much production value Fusion's wellhead maintenance programs could protect for your operations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Calculator Inputs */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-6 md:p-8 bg-card/80 border-border backdrop-blur-sm shadow-2xl h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">Your Operation Metrics</h3>

              <div className="space-y-8 flex-1">
                {/* Operation Type */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">Operation Type</label>
                  <Select
                    value={inputs.operationType}
                    onValueChange={handleOperationTypeChange}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="offshore">Offshore Platform</SelectItem>
                      <SelectItem value="onshore">Onshore Field</SelectItem>
                      <SelectItem value="subsea">Subsea</SelectItem>
                      <SelectItem value="platform">Fixed Platform</SelectItem>
                      <SelectItem value="fpso">FPSO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Wells */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Active Wells:{" "}
                    <span className="text-foreground font-semibold">{inputs.activeWells}</span>
                  </label>
                  <Slider
                    value={[inputs.activeWells]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, activeWells: value }))}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Current Downtime */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Current Downtime:{" "}
                    <span className="text-foreground font-semibold">{inputs.currentDowntime}%</span>
                  </label>
                  <Slider
                    value={[inputs.currentDowntime]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, currentDowntime: value }))}
                    max={20}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Daily Production Value */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Daily Production Value per Well:{" "}
                    <span className="text-foreground font-semibold">€{inputs.dailyProductionValue.toLocaleString()}</span>
                  </label>
                  <Slider
                    value={[inputs.dailyProductionValue]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, dailyProductionValue: value }))}
                    max={config.maxProduction}
                    min={5000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                    <span>€5K</span>
                    <span>€{(config.maxProduction / 1000).toLocaleString()}K</span>
                  </div>
                </div>

                <div className="flex-1"></div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">&#128161; Operation Insights</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                      <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Downtime reduction:</span> {config.downtimeReduction}% average with Fusion's preventive maintenance programs
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                      <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Mobilisation time:</span> Average {config.responseTime} for {inputs.operationType} operations
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5">
                      <div className="w-2 h-2 rounded-full bg-bexoni mt-2 shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Safety improvement:</span> {config.safetyImprovement}% reduction in wellhead-related incidents
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-6 md:p-8 bg-card/80 border-border backdrop-blur-sm shadow-2xl h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">
                Your Potential with Fusion
              </h3>

              <div className="space-y-6 flex-1">
                {/* Current vs Improved */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 rounded-lg bg-secondary/50">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Current Downtime</div>
                    <div className="text-xl md:text-2xl font-bold text-foreground">{Math.round(annualDowntimeDays)}</div>
                    <div className="text-xs text-muted-foreground/60">days/year</div>
                  </div>
                  <div className="text-center p-3 md:p-4 rounded-lg bg-bexoni/10 border border-bexoni/20">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">With Fusion</div>
                    <div className="text-xl md:text-2xl font-bold text-foreground">{Math.round(reducedDowntimeDays)}</div>
                    <div className="text-xs text-muted-foreground">days/year</div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                      <span className="text-sm md:text-base text-foreground">Downtime Prevented</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-foreground">{downtimePrevented} days</span>
                  </div>

                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                      <span className="text-sm md:text-base text-foreground">Production Protected</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-foreground">
                      €{annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                      <span className="text-sm md:text-base text-foreground">Downtime Reduction</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-foreground">{config.downtimeReduction}%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-foreground/5 border border-border">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                      <span className="text-sm md:text-base text-foreground">Avg Mobilisation</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-foreground">{config.responseTime}</span>
                  </div>
                </div>

                {/* Annual Projection */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-lg bg-foreground/5 border border-border">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-muted-foreground mb-2">Projected Annual Production Savings</div>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      €{annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground/60">
                      Based on your current metrics and industry benchmarks
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className={`text-center mt-12 md:mt-16 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm text-muted-foreground/60 mt-4">* Results based on industry averages and may vary by operation</p>
        </div>
      </div>
    </section>
  )
}
