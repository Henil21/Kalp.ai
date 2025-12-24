import { useEffect } from "react";
import { gsap } from "gsap";
import Planet from "./Planet";

export default function IntroScreen() {
  useEffect(() => {
    gsap.to(".intro-planet", {
      x: "random(-40,40)",
      y: "random(-30,30)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1,
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-space">
      <Planet className="intro-planet left-[10%] top-[40%]" size={220} hue="teal" />
      <Planet className="intro-planet left-[60%] top-[20%]" size={180} hue="amber" />
      <Planet className="intro-planet left-[75%] top-[65%]" size={260} hue="rose" />
    </div>
  );
}
