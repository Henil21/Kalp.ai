import { motion } from "framer-motion";

export default function ConfirmDeleteModal({
  title = "Delete Research",
  description = "Are you sure you want to delete this research? This action cannot be undone.",
  onConfirm,
  onClose,
  loading = false,
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl flex flex-col gap-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-2xl font-serif italic">{title}</h2>

        <p className="text-text-muted text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-full border hover:bg-stone-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="h-10 px-5 rounded-full bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
