import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CinematicLights() {
  const key = useRef<THREE.DirectionalLight>(null);
  const fill = useRef<THREE.PointLight>(null);
  const rim = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (key.current) {
      key.current.position.x = Math.sin(t * 0.3) * 5;
      key.current.position.z = Math.cos(t * 0.3) * 5;
    }
    if (fill.current) {
      fill.current.intensity = 2.4 + Math.sin(t * 0.8) * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} color="#1a0f3a" />
      <directionalLight
        ref={key}
        position={[4, 5, 4]}
        intensity={2.2}
        color="#7c8cff"
      />
      <pointLight
        ref={fill}
        position={[-4, -2, 3]}
        intensity={2.4}
        color="#b388ff"
        distance={20}
      />
      <spotLight
        ref={rim}
        position={[0, 6, -6]}
        angle={0.5}
        penumbra={1}
        intensity={3.5}
        color="#e0c8ff"
      />
      <pointLight position={[3, -4, -2]} intensity={1.2} color="#ff9ad5" />
    </>
  );
}
