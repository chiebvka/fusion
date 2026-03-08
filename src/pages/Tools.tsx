export default function Tools() {
  const tools = [
    {
      name: "Lorem Calculator",
      description:
        "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Ipsum Generator",
      description:
        "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada.",
    },
    {
      name: "Dolor Analyzer",
      description:
        "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis.",
    },
    {
      name: "Amet Converter",
      description:
        "Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet.",
    },
    {
      name: "Sit Validator",
      description:
        "Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in elementum.",
    },
    {
      name: "Elit Optimizer",
      description:
        "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero.",
    },
  ]

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-bexoni">Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Free tools
            to help you get things done.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-3">
              <h2 className="text-xl font-semibold">{tool.name}</h2>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
