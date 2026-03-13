export default function Services() {
  const services = [
    {
      name: "Wellhead Equipment Supply",
      description:
        "Specification-led support for VETCO GRAY wellhead housings, casing hangers, sealing systems, and connector packages aligned to project requirements.",
    },
    {
      name: "Installation & Running Services",
      description:
        "Field execution support around running tools, landing confirmation, locking, orientation control, and safer installation planning.",
    },
    {
      name: "Maintenance & Workover Support",
      description:
        "Lifecycle support for producing assets, including intervention planning, integrity-focused servicing, and wellhead maintenance readiness.",
    },
    {
      name: "Connector Reconditioning",
      description:
        "Support for inspection and refurbishment of H-4 connectors, hydraulic circuits, preload mechanisms, and related wellhead hardware.",
    },
    {
      name: "Seal Assembly Replacement",
      description:
        "Service support for metal-to-metal and elastomeric sealing components where pressure integrity and dependable isolation are critical.",
    },
    {
      name: "Subsea Project Support",
      description:
        "Deepwater and subsea wellhead capability covering high-capacity systems, tubing head spools, and recoverable module planning.",
    },
  ]

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-bexoni">Service Offerings</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore the support areas Fusion aligns around, from wellhead equipment supply through installation,
            maintenance, workover activity, and subsea execution.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-3">
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
