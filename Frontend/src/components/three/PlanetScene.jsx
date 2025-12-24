import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import Space from "./space";
import Planet from "./Planet";
import Sun from "./Sun";

// function Sun() {
//   const sunRef = useRef();
//   const sunTexture = useLoader(TextureLoader, "/textures/2k_sun.jpg");

//   useFrame(() => {
//     sunRef.current.rotation.y += 0.001;
//   });

//   return (
//     <mesh ref={sunRef}>
//       <sphereGeometry args={[0.9, 64, 64]} />
//       <meshStandardMaterial
//         map={sunTexture}                 // 👈 THIS is now dominant
//         emissiveMap={sunTexture}         // 👈 glow comes from texture
//         emissive="#ffffff"
//         emissiveIntensity={1.2}          // 👈 reduced
//         roughness={0.4}
//         metalness={0}
//       />
//     </mesh>
//   );
// }
<Sun/>

export default function PlanetScene({ planets }) {
  return (
    <Canvas
      camera={{ position: [0, 3, 9], fov: 45 }}
      gl={{ physicallyCorrectLights: true }}
    >
      {/* Ambient fill */}
      <ambientLight intensity={0.3} />

      {/* Real sun light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3.5}
        color="#ffddaa"
      />

      {/* Galaxy background */}
      <Space />

      {/* Sun */}
      <Sun />

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet
          key={index}
          texturePath={planet.texture}
          size={planet.size}
          distance={planet.distance}
          orbitSpeed={planet.orbitSpeed}
          rotationSpeed={planet.rotationSpeed}
        />
      ))}
    </Canvas>
  );
}
