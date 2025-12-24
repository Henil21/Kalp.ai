export default function Architecture() {
  return (
    <section className="w-full px-6 py-24 bg-[#f4f4f0]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-serif italic text-text-main">
          The Architecture of Verification
        </h2>

        {/* Diagram Card */}
        <div className="w-full bg-white rounded-[2.5rem] border border-[#e6e6db] px-8 py-16 relative">

          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-[#e6e6db]" />

          {/* Nodes */}
          <div className="relative z-10 grid grid-cols-4 gap-6 items-center">

            {/* Submission */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-[#8c8b5f]" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-muted">
                Submission
              </span>
            </div>

            {/* AI Scan (active) */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-primary animate-pulse" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-main">
                AI Scan
              </span>
            </div>

            {/* Peer Review */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-[#8c8b5f]" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-muted">
                Peer Review
              </span>
            </div>

            {/* Publication */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-white border-4 border-[#8c8b5f]" />
              <span className="text-xs tracking-widest font-bold uppercase text-text-muted">
                Publication
              </span>
            </div>

          </div>
        </div>

        {/* Description */}
        <p className="text-text-muted max-w-lg leading-relaxed">
          Our system introduces a preliminary intelligence layer, filtering noise
          and verifying data integrity before human expertise is applied.
        </p>

      </div>
    </section>
  );
}
