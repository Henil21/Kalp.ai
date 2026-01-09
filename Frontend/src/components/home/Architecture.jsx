export default function Architecture() {
  return (
    <section className="w-full px-6 py-24 bg-[#f4f4f0]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-serif italic text-text-main">
          How the Platform Works
        </h2>

        {/* Diagram Card */}
        <div className="w-full bg-white rounded-[2.5rem] border border-[#e6e6db] px-8 py-16 relative">

          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-[#e6e6db]" />

          {/* Nodes */}
          <div className="relative z-10 grid grid-cols-4 gap-6 items-center">

            {/* Researcher */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-primary" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-main">
                Researcher
              </span>
            </div>

            {/* Publish */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-[#8c8b5f]" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-muted">
                Publish Research
              </span>
            </div>

            {/* Explorer */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-[#8c8b5f]" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-muted">
                Explorer
              </span>
            </div>

            {/* Read */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-[#8c8b5f]" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-muted">
                Read & Discover
              </span>
            </div>

          </div>
        </div>

        {/* Description */}
        <p className="text-text-muted max-w-lg leading-relaxed">
         Researchers publish their work, while explorers read and discover research shared by the community.
        </p>

      </div>
    </section>
  );
}
