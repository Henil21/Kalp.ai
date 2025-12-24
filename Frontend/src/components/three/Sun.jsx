import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Sun() {
  const sunRef = useRef();
  const sunTexture = useLoader(TextureLoader, "/textures/2k_sun.jpg");

  useFrame(() => {
    sunRef.current.rotation.y += 0.0008;
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[0.9, 64, 64]} />
      <meshBasicMaterial
        map={sunTexture}   // 👈 shows texture EXACTLY
      />
    </mesh>
  );
}
