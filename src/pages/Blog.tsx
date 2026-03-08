export default function Blog() {
  const posts = [
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      date: "March 5, 2026",
      excerpt:
        "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      title: "Praesent Sapien Massa Convallis",
      date: "February 20, 2026",
      excerpt:
        "Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget.",
    },
    {
      title: "Curabitur Non Nulla Sit Amet",
      date: "February 10, 2026",
      excerpt:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque auctor sit amet.",
    },
    {
      title: "Nulla Porttitor Accumsan Tincidunt",
      date: "January 28, 2026",
      excerpt:
        "Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    },
    {
      title: "Vestibulum Ac Diam Sit Amet",
      date: "January 15, 2026",
      excerpt:
        "Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    },
    {
      title: "Mauris Blandit Aliquet Elit",
      date: "January 3, 2026",
      excerpt:
        "Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis.",
    },
  ]

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-bexoni">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Insights,
            updates, and stories from our team.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={i} className="border rounded-lg p-6 space-y-3">
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
