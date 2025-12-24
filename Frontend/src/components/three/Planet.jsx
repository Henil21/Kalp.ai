import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Planet({
  texturePath,
  size = 1,
  distance = 2,
  orbitSpeed = 0.05,          // 🚀 VERY FAST
  rotationSpeed = 0.01,
  inclination = 0.4,          // 👈 tilt (radians)
}) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const texture = useLoader(TextureLoader, texturePath);

  useFrame(() => {
    orbitRef.current.rotation.y += orbitSpeed;
    planetRef.current.rotation.y += rotationSpeed;
  });

  return (
    <group
      ref={orbitRef}
      rotation={[inclination, 0, 0]} // 👈 TILT THE ORBIT PLANE
    >
      <mesh ref={planetRef} position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}
