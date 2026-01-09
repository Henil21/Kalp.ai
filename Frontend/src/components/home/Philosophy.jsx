export default function Philosophy() {
  return (
    <section className="px-6 py-16 bg-white border-y">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <h2 className="text-4xl font-serif italic">Our Philosophy</h2>
          <p className="text-text-muted max-w-sm text-sm">
            We believe research should be open, accessible, and easy to share
            across communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: "publish",
              title: "Open Publishing",
              text:
                "A simple space for researchers to share their work with a wider audience.",
            },
            {
              icon: "public",
              title: "Shared Discovery",
              text:
                "Helping explorers discover research across topics and disciplines.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group flex flex-col justify-between gap-8 rounded-[2.5rem] bg-[#f8f8f5] p-10 hover:bg-[#f0f0eb] transition border"
            >
              <div className="size-12 rounded-full bg-white flex items-center justify-center border group-hover:scale-110 transition">
                <span className="material-symbols-outlined">{c.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif italic">{c.title}</h3>
                <p className="text-text-muted mt-2">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
