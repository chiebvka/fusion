export default function Faqs() {
  const faqs = [
    {
      question: "What wellhead solutions does Fusion provide?",
      answer:
        "Fusion supports wellhead equipment supply, installation and running services, maintenance and workover support, connector reconditioning, seal replacement, and subsea project requirements.",
    },
    {
      question: "Does Fusion work with VETCO GRAY wellhead systems?",
      answer:
        "Yes. Fusion is positioned around VETCO GRAY wellhead solutions, helping clients align recognised wellhead technology with local project support and operational accountability.",
    },
    {
      question: "Can Fusion support installation and running operations?",
      answer:
        "Yes. Fusion supports installation activity with running tools, landing confirmation, locking support, and execution planning for controlled wellhead deployment.",
    },
    {
      question: "Do you handle subsea and deepwater wellhead requirements?",
      answer:
        "Yes. Fusion supports subsea wellhead systems, tubing head spool requirements, deepwater installation planning, and projects that require higher-pressure subsea capability.",
    },
    {
      question: "Can Fusion support maintenance, seals, and connector service?",
      answer:
        "Yes. Support areas include maintenance and workover activity, connector reconditioning, seal assembly replacement, and recoverable module-related service planning.",
    },
    {
      question: "Is critical operations support available?",
      answer:
        "Yes. Fusion provides 24/7 support availability for critical operations and urgent wellhead-related project needs.",
    },
  ]

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-bexoni">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Find answers to common questions about Fusion&apos;s wellhead supply, installation, maintenance, and subsea
            support capabilities.
          </p>
        </section>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-2">
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
