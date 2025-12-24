import { motion } from "framer-motion";

export default function ResearchPreview({ data, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        layoutId={`research-${data._id}`}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-white rounded-3xl p-10 shadow-xl flex flex-col gap-6"
      >
        <div className="flex justify-between items-start">
          <div className="text-xs text-text-muted">
            {data.domain} •{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </div>

          <button
            onClick={onClose}
            className="text-sm font-medium hover:text-text-muted"
          >
            ✕
          </button>
        </div>

        <h2 className="text-4xl font-serif italic">
          {data.title}
        </h2>

        <p className="text-text-muted leading-relaxed">
          {data.abstract}
        </p>

        {data.links?.length > 0 && (
          <div className="flex gap-4">
            {data.links.map((l, i) => (
              <a
                key={i}
                href={l}
                target="_blank"
                className="text-sm underline"
              >
                Reference
              </a>
            ))}
          </div>
        )}

        {data.sourceCode && (
          <a
            href={data.sourceCode}
            target="_blank"
            className="text-sm font-bold underline underline-offset-4"
          >
            View Source Code →
          </a>
        )}
      </motion.article>
    </motion.div>
  );
}
