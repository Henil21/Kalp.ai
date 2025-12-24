import { useEffect } from "react";
import { gsap } from "gsap";
import Planet from "./Planet";

export default function PlanetCarousel() {
  useEffect(() => {
    gsap.from(".avatar-planet", {
      scale: 0.7,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex gap-10 overflow-x-auto px-10">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="avatar-planet cursor-pointer transition hover:scale-110"
        >
          <Planet size={120 + i * 10} />
        </div>
      ))}
    </div>
  );
}
