export default function Story() {
  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        <section>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Our partnership and the{" "}
            <span className="text-bexoni">VETCO GRAY advantage.</span>
          </h1>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">What Fusion Brings</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Fusion Limited has built its focus around a clear mission: delivering specialist wellhead solutions with
            strong local accountability. Our role is to bring project coordination, service responsiveness, and
            wellhead execution support to operators who need dependable delivery in the Nigerian oil and gas sector.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            That means understanding more than equipment alone. It means helping clients align supply, installation,
            maintenance, workover planning, and subsea readiness around the realities of field execution.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">Why the Partnership Matters</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Fusion partners with VETCO GRAY, a name associated with long-standing wellhead engineering capability. That
            partnership gives clients access to globally recognised wellhead technology through a partner that can stay
            close to the project and remain accountable through delivery.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            In practice, that combination matters because operators need both performance and responsiveness. Global
            technology has more value when it is backed by local support, practical execution planning, and teams that
            understand the urgency of installation windows and intervention schedules.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">What We Deliver</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Fusion supports the full wellhead lifecycle around four core areas: equipment supply, installation and
            running services, maintenance and workover support, and subsea wellhead capability. That includes support
            around wellhead housings, casing hangers, seal systems, connector families, and the tooling or service
            activities needed to deploy and maintain them correctly.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            We also support more demanding scopes such as deepwater and subsea applications, connector reconditioning,
            seal assembly replacement, and recoverable module operations where intervention efficiency matters.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">Our Commitment</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Fusion is built around integrity, precision, and performance. Our commitment is to help clients secure
            long-term wellhead reliability by combining the right technology with disciplined project support and clear
            operational accountability.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Whether the requirement is a new installation, a maintenance intervention, or a subsea project, we aim to
            be the partner that keeps execution aligned from planning through completion.
          </p>
        </section>

        <section>
          <div className="flex flex-col items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-bexoni/10 flex items-center justify-center">
              <span className="text-bexoni text-2xl font-bold">F</span>
            </div>
            <div>
              <p className="text-bexoni text-base mb-1">Best regards,</p>
              <p className="text-2xl font-bold text-bexoni">Fusion Limited</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
