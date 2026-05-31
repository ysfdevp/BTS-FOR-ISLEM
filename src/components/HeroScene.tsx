import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import CinematicLights from "./CinematicLights";
import FloatingParticles from "./FloatingParticles";

function CentralArtifact() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const shards = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = state.mouse.x;
    const my = state.mouse.y;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.4 + t * 0.12, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -my * 0.3 + Math.sin(t * 0.3) * 0.05, 0.04);
      group.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.x = t * 0.4;
      inner.current.rotation.z = t * 0.25;
    }
    if (shards.current) {
      shards.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={inner}>
          <torusKnotGeometry args={[1.05, 0.32, 220, 32, 2, 3]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={1.2}
            chromaticAberration={0.4}
            anisotropy={0.6}
            distortion={0.4}
            distortionScale={0.3}
            temporalDistortion={0.15}
            color="#b39bff"
            roughness={0.05}
            ior={1.45}
            transmission={1}
          />
        </mesh>
      </Float>

      <group ref={shards}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 2.4;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * r, Math.sin(angle * 2) * 0.6, Math.sin(angle) * r]}
              rotation={[angle, angle * 1.3, 0]}
            >
              <octahedronGeometry args={[0.18, 0]} />
              <meshPhysicalMaterial
                color="#dcd1ff"
                metalness={1}
                roughness={0.15}
                clearcoat={1}
                clearcoatRoughness={0.05}
                emissive="#5a3aff"
                emissiveIntensity={0.4}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.5], fov: 42 }}
    >
      <color attach="background" args={["#06030f"]} />
      <fog attach="fog" args={["#06030f", 6, 14]} />
      <Suspense fallback={null}>
        <CinematicLights />
        <CentralArtifact />
        <FloatingParticles count={900} radius={7} />
        <Environment preset="night" />
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur radius={0.85} />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0009, 0.0014)}
            radialModulation={false}
            modulationOffset={0}
            blendFunction={BlendFunction.NORMAL}
          />
          <Noise opacity={0.05} premultiply blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
