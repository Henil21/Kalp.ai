import { motion } from "framer-motion";

export default function FloatingPlanet({
  src,
  size = 120,
  x,
  y,
  floatRange = 20,
}) {
  return (
    <motion.img
      src={src}
      draggable={false}
      className="absolute select-none cursor-grab active:cursor-grabbing"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      animate={{
        y: [y - floatRange, y + floatRange],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 4 + Math.random() * 3,
        ease: "easeInOut",
      }}
      drag
      dragElastic={0.4}
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight }}
      whileTap={{ scale: 1.05 }}
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 18,
      }}
      onDragEnd={(e, info) => {
        // snap back effect
        e.target.style.transform = "";
      }}
    />
  );
}
