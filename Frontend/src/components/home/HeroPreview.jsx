import { motion } from "framer-motion";

export default function HeroPreview({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-white rounded-3xl p-10 shadow-xl flex flex-col gap-6"
      >
        <div className="flex justify-between items-start">
          <div className="text-xs text-text-muted">
            Platform Overview • Beta
          </div>

          <button
            onClick={onClose}
            className="text-sm font-medium hover:text-text-muted"
          >
            ✕
          </button>
        </div>

        <h2 className="text-4xl font-serif italic">
          How Research Works Here
        </h2>

        <p className="text-text-muted leading-relaxed">
          Researchers can publish their work openly, while explorers read and
          discover research shared by the community. The platform focuses on
          accessibility and visibility.
        </p>

        <ul className="list-disc pl-6 text-text-muted text-sm space-y-2">
          <li>Open publishing for researchers</li>
          <li>Community-driven discovery</li>
          <li>No AI or review layer at this stage</li>
        </ul>
      </motion.article>
    </motion.div>
  );
}
