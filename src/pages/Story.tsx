export default function Story() {
  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        {/* Hero heading */}
        <section>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            This is why we're building{" "}
            <span className="text-bexoni">Fusion.</span>
          </h1>
        </section>

        {/* What is Fusion */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">What is Fusion?</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Fusion Limited is a specialist wellhead solutions partner serving the oil and gas industry. We provide
            comprehensive services for wellhead maintenance, repair, pressure testing, equipment procurement, and
            emergency response — ensuring your operations run safely and efficiently around the clock.
          </p>
        </section>

        {/* Problem */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">Problem</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            After years of working across the oil and gas sector, we noticed the same challenges coming up again and
            again. Operators were dealing with ageing wellhead infrastructure, unplanned downtime, and a shortage of
            specialist engineers who could respond quickly. They were juggling multiple contractors — one for maintenance,
            another for testing, a separate supplier for parts — and still struggling to keep operations on schedule.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            We realised that most operators were losing valuable production time simply because they couldn't get the
            right expertise on-site fast enough. The services that existed were either too fragmented, too slow to
            mobilise, or lacked the deep technical knowledge required for complex wellhead systems.
          </p>
        </section>

        {/* Solution */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">Solution</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            So we asked ourselves, why not create one comprehensive partner that handles all of this under a single
            roof? Fusion was born from this need — a unified wellhead solutions provider that covers everything from
            routine maintenance and integrity testing to emergency repair and equipment supply. What started as a small
            team of experienced field engineers has grown into a trusted partner for operators across the region.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            We've built our reputation on rapid mobilisation, deep technical expertise, and an unwavering commitment
            to safety. Our clients trust us because we understand the pressure of production schedules and the
            critical importance of keeping wells operational and compliant.
          </p>
        </section>

        {/* Our Vision */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-bexoni">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            We believe that every operator, from independent producers to major energy companies, deserves access to
            world-class wellhead expertise without the complexity of managing multiple vendors. Fusion isn't just about
            fixing problems — it's about empowering operators to focus on production while we handle the complexity of
            wellhead integrity, compliance, and asset management. As the industry evolves, we're committed to staying
            at the forefront of wellhead technology and service excellence.
          </p>
        </section>

        {/* Sign-off */}
        <section>
          <div className="flex flex-col items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-bexoni/10 flex items-center justify-center">
              <span className="text-bexoni text-2xl font-bold">F</span>
            </div>
            <div>
              <p className="text-bexoni text-base mb-1">Best regards,</p>
              <p className="text-2xl font-bold text-bexoni">Fusion Team</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
