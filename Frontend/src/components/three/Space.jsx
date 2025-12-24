import { useLoader } from "@react-three/fiber";
import { TextureLoader, BackSide } from "three";

export default function Space() {
  const stars = useLoader(
    TextureLoader,
    "/textures/2k_stars_milky_way.jpg"
  );

  return (
    <mesh>
      <sphereGeometry args={[60, 64, 64]} />
      <meshBasicMaterial map={stars} side={BackSide} />
    </mesh>
  );
}
