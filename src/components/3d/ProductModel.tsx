import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductColor, FinishType } from '../../types';

interface ProductModelProps {
  color: ProductColor;
  finish: FinishType;
  isExploded: boolean;
  isFreeOrbit: boolean;
  autoRotate: boolean;
  mousePos: { x: number; y: number };
  stageRotationOffset?: [number, number, number];
  onPartClick?: (partName: string) => void;
}

export const ProductModel: React.FC<ProductModelProps> = ({
  color,
  finish,
  isExploded,
  isFreeOrbit,
  autoRotate,
  mousePos,
  stageRotationOffset = [0, 0, 0],
  onPartClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const waveRingRef = useRef<THREE.Mesh>(null);
  const dialRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const middleMeshRef = useRef<THREE.Mesh>(null);
  const speakerConeRef = useRef<THREE.Mesh>(null);
  const topCrownRef = useRef<THREE.Group>(null);

  // Compute material properties based on color and finish
  const materials = useMemo(() => {
    let roughness = color.roughness;
    let metalness = color.metalness;
    let clearcoat = color.clearcoat;

    if (finish === 'matte') {
      roughness = Math.min(0.6, roughness + 0.2);
      clearcoat = 0.05;
    } else if (finish === 'brushed') {
      roughness = 0.35;
      metalness = 0.95;
      clearcoat = 0.2;
    } else if (finish === 'ceramic') {
      roughness = 0.1;
      metalness = 0.4;
      clearcoat = 0.95;
    }

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color.bodyColor),
      metalness: metalness,
      roughness: roughness,
      clearcoat: clearcoat,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color.metalColor),
      metalness: 0.92,
      roughness: 0.22,
    });

    const darkGrilleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0d0f14'),
      metalness: 0.85,
      roughness: 0.45,
      wireframe: false,
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color.glowColor),
    });

    const sapphireGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#111827'),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.9,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color.accentHex),
      metalness: 0.9,
      roughness: 0.2,
    });

    return {
      bodyMat,
      titaniumMat,
      darkGrilleMat,
      glowMat,
      sapphireGlassMat,
      goldAccentMat,
    };
  }, [color, finish]);

  // Animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth auto-rotation if enabled and not in free orbit dragging
    if (autoRotate && !isFreeOrbit) {
      groupRef.current.rotation.y += delta * 0.35;
    }

    // Parallax mouse responsiveness
    if (!isFreeOrbit) {
      const targetRotX = (mousePos.y * 0.25) + stageRotationOffset[0];
      const targetRotY = (mousePos.x * 0.35) + stageRotationOffset[1] + (autoRotate ? groupRef.current.rotation.y : 0);
      const targetRotZ = stageRotationOffset[2];

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      if (!autoRotate) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      }
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
    }

    // Floating breathing effect on the internal glowing core
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (waveRingRef.current) {
      waveRingRef.current.rotation.z += delta * 0.8;
    }

    // Exploded view component translations (Lerp to target Y offsets)
    const topTargetY = isExploded ? 1.6 : 0.82;
    const coreTargetY = isExploded ? 0.65 : 0.0;
    const middleTargetY = isExploded ? -0.1 : 0.0;
    const baseTargetY = isExploded ? -1.4 : -0.85;

    if (topCrownRef.current) {
      topCrownRef.current.position.y = THREE.MathUtils.lerp(topCrownRef.current.position.y, topTargetY, 0.08);
    }
    if (coreRef.current) {
      coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, coreTargetY, 0.08);
    }
    if (middleMeshRef.current) {
      middleMeshRef.current.position.y = THREE.MathUtils.lerp(middleMeshRef.current.position.y, middleTargetY, 0.08);
    }
    if (baseRef.current) {
      baseRef.current.position.y = THREE.MathUtils.lerp(baseRef.current.position.y, baseTargetY, 0.08);
    }
    if (speakerConeRef.current) {
      const coneTargetY = isExploded ? -0.7 : -0.2;
      speakerConeRef.current.position.y = THREE.MathUtils.lerp(speakerConeRef.current.position.y, coneTargetY, 0.08);
    }
  });

  return (
    <group ref={groupRef} dispose={null} position={[0, 0, 0]}>
      {/* --- TOP ASSEMBLY: HAPTIC CROWN & GLASS OLED --- */}
      <group
        ref={topCrownRef}
        position={[0, 0.82, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('Haptic Optical Crown & Sapphire Glass');
        }}
      >
        {/* Outer Titanium Bezel */}
        <mesh material={materials.titaniumMat}>
          <cylinderGeometry args={[0.92, 0.95, 0.12, 48]} />
        </mesh>

        {/* Knurled Control Ring Ribs */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const x = Math.cos(angle) * 0.93;
          const z = Math.sin(angle) * 0.93;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]} material={materials.goldAccentMat}>
              <boxGeometry args={[0.02, 0.11, 0.04]} />
            </mesh>
          );
        })}

        {/* Sapphire Glass Top */}
        <mesh position={[0, 0.065, 0]} material={materials.sapphireGlassMat}>
          <cylinderGeometry args={[0.82, 0.82, 0.02, 48]} />
        </mesh>

        {/* Glowing Concentric Waveform Ring underneath Glass */}
        <mesh ref={waveRingRef} position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.glowMat}>
          <ringGeometry args={[0.3, 0.36, 48]} />
        </mesh>

        <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.glowMat}>
          <ringGeometry args={[0.55, 0.58, 48]} />
        </mesh>

        {/* Central Display Core Icon */}
        <mesh position={[0, 0.056, 0]} material={materials.goldAccentMat}>
          <cylinderGeometry args={[0.12, 0.12, 0.005, 32]} />
        </mesh>
      </group>

      {/* --- UPPER ACOUSTIC CHASSIS (MAIN BODY) --- */}
      <group
        position={[0, 0.32, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('Acoustic Titanium Housing');
        }}
      >
        {/* Chamfered Upper Cylinder */}
        <mesh material={materials.bodyMat}>
          <cylinderGeometry args={[0.95, 1.0, 0.85, 48]} />
        </mesh>

        {/* Precision Micro-Perforated Grille Inset Ring */}
        <mesh position={[0, 0.05, 0]} material={materials.darkGrilleMat}>
          <cylinderGeometry args={[0.965, 0.965, 0.45, 48]} />
        </mesh>

        {/* Accent Edge Band */}
        <mesh position={[0, -0.42, 0]} material={materials.goldAccentMat}>
          <torusGeometry args={[0.99, 0.018, 16, 48]} />
        </mesh>
      </group>

      {/* --- CENTRAL TRANSDUCER MATRIX & GLOW CORE --- */}
      <mesh
        ref={coreRef}
        position={[0, 0, 0]}
        material={materials.glowMat}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('Quantum DSP & Luminescent Core');
        }}
      >
        <octahedronGeometry args={[0.38, 2]} />
      </mesh>

      {/* Orbiting Resonator Rings */}
      <group position={[0, 0, 0]}>
        <mesh material={materials.titaniumMat} rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[0.65, 0.02, 16, 48]} />
        </mesh>
        <mesh material={materials.goldAccentMat} rotation={[-0.3, -0.4, 0.5]}>
          <torusGeometry args={[0.72, 0.015, 16, 48]} />
        </mesh>
      </group>

      {/* --- LOWER ACOUSTIC ENCLOSURE --- */}
      <mesh
        ref={middleMeshRef}
        position={[0, -0.38, 0]}
        material={materials.bodyMat}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('Resonance Cavity');
        }}
      >
        <cylinderGeometry args={[1.0, 0.92, 0.72, 48]} />
      </mesh>

      {/* Sub-woofer Diaphragm Cone (visible during exploded view) */}
      <mesh
        ref={speakerConeRef}
        position={[0, -0.2, 0]}
        rotation={[Math.PI, 0, 0]}
        material={materials.darkGrilleMat}
      >
        <coneGeometry args={[0.7, 0.45, 32, 1, true]} />
      </mesh>

      {/* --- BASE ASSEMBLY: ISOLATION & CHARGING MATRIX --- */}
      <group
        ref={baseRef}
        position={[0, -0.85, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('Kinetic Isolation Base & Qi2 Coil');
        }}
      >
        {/* Main Base Plate */}
        <mesh material={materials.titaniumMat}>
          <cylinderGeometry args={[0.92, 0.84, 0.22, 48]} />
        </mesh>

        {/* Ambient Ring Ground Illumination Channel */}
        <mesh position={[0, -0.08, 0]} material={materials.glowMat}>
          <torusGeometry args={[0.85, 0.025, 16, 48]} />
        </mesh>

        {/* Fluoroelastomer Damping Feet */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * 0.65;
          const z = Math.sin(angle) * 0.65;
          return (
            <mesh key={i} position={[x, -0.13, z]} material={materials.darkGrilleMat}>
              <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
            </mesh>
          );
        })}

        {/* Magnetic Port Connector Center */}
        <mesh position={[0, -0.11, 0]} material={materials.goldAccentMat}>
          <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
        </mesh>
      </group>
    </group>
  );
};
