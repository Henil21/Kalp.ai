import { motion } from "framer-motion";

export default function ResearchCard({ data, actions, onClick }) {
  return (
    <motion.article
      layoutId={`research-${data._id}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97, rotateY: 3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="cursor-pointer group flex h-full flex-col gap-4 p-6 rounded-2xl bg-white border border-[#e6e6db] hover:border-primary"
    >

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3 text-xs text-text-muted truncate">
          <span className="truncate">{data.domain}</span>
          <span className="size-1 rounded-full bg-stone-300 shrink-0" />
          <span className="shrink-0">
            {new Date(data.createdAt).toLocaleDateString()}
          </span>
        </div>

        {actions && (
          <div className="shrink-0 flex gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* ===== Title ===== */}
      <h3 className="text-xl font-serif italic leading-tight group-hover:underline decoration-primary decoration-2 underline-offset-4">
        {data.title}
      </h3>

      {/* ===== Abstract ===== */}
      <p className="text-sm text-text-muted line-clamp-3">
        {data.abstract}
      </p>

      {/* ===== Links ===== */}
      <div className="flex flex-wrap gap-3 mt-2">
        {data.links?.map((link, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs underline hover:text-text-main"
          >
            Reference
          </a>
        ))}

        {data.sourceCode && (
          <a
            href={data.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs underline hover:text-text-main"
          >
            Source Code
          </a>
        )}
      </div>

      {/* ===== Footer ===== */}
      <div className="text-xs text-text-muted mt-auto">
        Published by {data.authorId?.name || "You"}
      </div>
    </motion.article>
  );
}
