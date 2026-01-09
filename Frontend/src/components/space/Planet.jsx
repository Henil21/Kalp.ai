import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/* 🌌 Shared registry */
const PLANETS = [];

export default function Planet({ texture, position, radius }) {
  const mesh = useRef();
  const baseZ = useRef(position[2]);              // 🔒 LOCK Z
  const baseY = useRef(position[1]);

  const velocity = useRef(new THREE.Vector3());
  const dragging = useRef(false);
  const dragOffset = useRef(new THREE.Vector3());
  const lastPos = useRef(new THREE.Vector3());

  const { camera } = useThree();
  const map = useTexture(texture);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const plane = useRef(new THREE.Plane());

  /* 🪐 STABLE SPACE PHYSICS */
  const FLOAT_AMPLITUDE = 0.25;
  const FLOAT_SPEED = 0.4;
  const ROTATION_SPEED = 0.0002;
  const INERTIA_DAMPING = 0.997;
  const THROW_MULTIPLIER = 0.5;
  const BOUNCE_DAMPING = 0.85;
  const COLLISION_DAMPING = 0.9;
  const EDGE_PADDING = radius;

  /* 🔗 Register */
  useEffect(() => {
    PLANETS.push({ mesh, velocity, radius });
    return () => {
      const i = PLANETS.findIndex(p => p.mesh === mesh);
      if (i !== -1) PLANETS.splice(i, 1);
    };
  }, [radius]);

  useFrame((state) => {
    if (!mesh.current) return;

    // 🔒 FORCE FIXED Z (EVERY FRAME)
    mesh.current.position.z = baseZ.current;
    velocity.current.z = 0;

    // 🌍 Rotation
    mesh.current.rotation.y += ROTATION_SPEED;

    // 🌊 FLOAT ONLY ON Y (OFFSET, NOT ADD)
    mesh.current.position.y =
      baseY.current +
      Math.sin(state.clock.elapsedTime * FLOAT_SPEED + radius) *
        FLOAT_AMPLITUDE;

    if (!dragging.current) {
      // 🛰️ Drift (X/Y only)
      mesh.current.position.x += velocity.current.x;
      mesh.current.position.y += velocity.current.y;

      velocity.current.multiplyScalar(INERTIA_DAMPING);

      /* 📐 SCREEN EDGE BOUNDS (Z-LOCKED) */
      const distance = Math.abs(camera.position.z - baseZ.current);
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const height = 2 * Math.tan(vFov / 2) * distance;
      const width = height * camera.aspect;

      const xLimit = width / 2 - EDGE_PADDING;
      const yLimit = height / 2 - EDGE_PADDING;

      if (mesh.current.position.x > xLimit) {
        mesh.current.position.x = xLimit;
        velocity.current.x *= -BOUNCE_DAMPING;
      } else if (mesh.current.position.x < -xLimit) {
        mesh.current.position.x = -xLimit;
        velocity.current.x *= -BOUNCE_DAMPING;
      }

      if (mesh.current.position.y > yLimit) {
        mesh.current.position.y = yLimit;
        velocity.current.y *= -BOUNCE_DAMPING;
      } else if (mesh.current.position.y < -yLimit) {
        mesh.current.position.y = -yLimit;
        velocity.current.y *= -BOUNCE_DAMPING;
      }

      /* 🟢 PLANET–PLANET COLLISION (XY ONLY) */
      for (const other of PLANETS) {
        if (other.mesh === mesh) continue;

        const posA = mesh.current.position;
        const posB = other.mesh.current.position;

        const dx = posA.x - posB.x;
        const dy = posA.y - posB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = radius + other.radius;

        if (dist < minDist && dist > 0.0001) {
          const nx = dx / dist;
          const ny = dy / dist;

          const overlap = (minDist - dist) * 0.5;
          posA.x += nx * overlap;
          posA.y += ny * overlap;
          posB.x -= nx * overlap;
          posB.y -= ny * overlap;

          const va = velocity.current;
          const vb = other.velocity.current;

          const impactA = va.x * nx + va.y * ny;
          const impactB = vb.x * nx + vb.y * ny;

          va.x += (impactB - impactA) * nx;
          va.y += (impactB - impactA) * ny;
          vb.x += (impactA - impactB) * nx;
          vb.y += (impactA - impactB) * ny;

          va.multiplyScalar(COLLISION_DAMPING);
          vb.multiplyScalar(COLLISION_DAMPING);
        }
      }
    }
  });

  const getWorldPoint = (e, target = new THREE.Vector3()) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    plane.current.setFromNormalAndCoplanarPoint(
      new THREE.Vector3(0, 0, 1),
      mesh.current.position
    );

    raycaster.ray.intersectPlane(plane.current, target);
    return target;
  };

  const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    velocity.current.set(0, 0, 0);

    const hit = getWorldPoint(e);
    dragOffset.current.copy(mesh.current.position).sub(hit);
    lastPos.current.copy(mesh.current.position);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    e.stopPropagation();

    const hit = getWorldPoint(e);
    const nextPos = hit.clone().add(dragOffset.current);

    velocity.current.x =
      (nextPos.x - lastPos.current.x) * THROW_MULTIPLIER;
    velocity.current.y =
      (nextPos.y - lastPos.current.y) * THROW_MULTIPLIER;

    mesh.current.position.x = nextPos.x;
    mesh.current.position.y = nextPos.y;

    lastPos.current.copy(nextPos);
    baseY.current = nextPos.y;
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={map} />
    </mesh>
  );
}
