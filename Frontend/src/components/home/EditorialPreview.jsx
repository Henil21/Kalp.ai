import { motion } from "framer-motion";

export default function EditorialPreview({ data, onClose }) {
  if (!data) return null;

  return (
    <motion.div
      data-modal-open="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-3xl p-10 shadow-xl flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="text-xs text-text-muted">
            {data.domain} • {new Date(data.createdAt).toLocaleDateString()}
          </div>

          <button
            onClick={onClose}
            className="text-sm font-medium hover:text-text-muted"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-serif italic">
          {data.title}
        </h2>

        {/* Abstract */}
        <p className="text-text-muted leading-relaxed">
          {data.abstract}
        </p>

        {/* Optional list / details */}
        {data.points && (
          <ul className="list-disc pl-6 text-text-muted text-sm space-y-2">
            {data.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </motion.article>
    </motion.div>
  );
}
