import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Planet({
  size = 200,
  hue = "teal",
  slowRotate = false,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (slowRotate) {
      gsap.to(ref.current, {
        rotate: 360,
        duration: 90,
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`relative rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {/* base */}
      <div className={`absolute inset-0 rounded-full planet-${hue}`} />

      {/* shadow */}
      <div className="absolute inset-0 rounded-full shadow-overlay" />

      {/* atmosphere */}
      <div className="absolute -inset-2 rounded-full atmosphere" />
    </div>
  );
}
