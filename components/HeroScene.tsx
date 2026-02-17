'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Torus, Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const techIcons = [
  { label: 'React', color: '#61DAFB', angle: 0 },
  { label: 'Node', color: '#68A063', angle: 60 },
  { label: 'Python', color: '#3572A5', angle: 120 },
  { label: 'Next', color: '#FFFFFF', angle: 180 },
  { label: 'TS', color: '#3178C6', angle: 240 },
  { label: 'AWS', color: '#FF9900', angle: 300 },
];

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#1a2744"
          emissive="#4F8EF7"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.1}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh scale={1.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4F8EF7"
          emissive="#00D4FF"
          emissiveIntensity={0.05}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRing({ radius, speed, color, tilt = 0 }: {
  radius: number;
  speed: number;
  color: string;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 8, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

function OrbitingDot({ radius, speed, offset, color }: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function ParticleField() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const geo = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    if (geo.current) {
      const t = state.clock.elapsedTime * 0.05;
      const pos = geo.current.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(t + i) * 0.002;
      }
      geo.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points>
      <bufferGeometry ref={geo}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#4F8EF7"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouseY * -0.3 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4F8EF7" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[0, 0, -5]} intensity={0.3} color="#00D4FF" />

      <group ref={groupRef}>
        <CentralOrb />
        
        <OrbitingRing radius={2.6} speed={0.3} color="#4F8EF7" tilt={Math.PI * 0.1} />
        <OrbitingRing radius={3.2} speed={-0.2} color="#8B5CF6" tilt={Math.PI * 0.3} />
        <OrbitingRing radius={3.8} speed={0.15} color="#00D4FF" tilt={Math.PI * 0.5} />

        <OrbitingDot radius={2.6} speed={0.4} offset={0} color="#4F8EF7" />
        <OrbitingDot radius={2.6} speed={0.4} offset={Math.PI} color="#4F8EF7" />
        <OrbitingDot radius={3.2} speed={-0.3} offset={0} color="#8B5CF6" />
        <OrbitingDot radius={3.8} speed={0.2} offset={Math.PI / 3} color="#00D4FF" />
      </group>

      <ParticleField />
    </>
  );
}

export default function HeroScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  );
}
