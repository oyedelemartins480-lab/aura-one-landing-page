import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProductModel } from './ProductModel';
import { ProductColor, FinishType, CameraStage } from '../../types';
import { CAMERA_STAGES } from '../../data/productData';

interface ProductSceneProps {
  color: ProductColor;
  finish: FinishType;
  isExploded: boolean;
  isFreeOrbit: boolean;
  autoRotate: boolean;
  currentStageIndex: number;
  mousePos: { x: number; y: number };
  onPartClick?: (partName: string) => void;
}

// Camera controller that smoothly interpolates camera positions during scroll stages
const CameraRig: React.FC<{
  currentStage: CameraStage;
  isFreeOrbit: boolean;
  mousePos: { x: number; y: number };
}> = ({ currentStage, isFreeOrbit, mousePos }) => {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (isFreeOrbit) return;

    // Target position with subtle mouse parallax
    const targetX = currentStage.cameraPosition[0] + (mousePos.x * 0.2);
    const targetY = currentStage.cameraPosition[1] - (mousePos.y * 0.2);
    const targetZ = currentStage.cameraPosition[2];

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 2.8);

    const stageTarget = new THREE.Vector3(...currentStage.targetPosition);
    targetLookAt.current.lerp(stageTarget, delta * 3.5);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

// Studio Lighting Rig
const StudioLighting: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  return (
    <>
      {/* Soft studio ambient light */}
      <ambientLight intensity={0.45} color="#e2e8f0" />

      {/* Main soft Key Light (top-front-right) */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.6}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Soft Fill Light (cool blue-tinted from lower left) */}
      <directionalLight
        position={[-5, -2, 3]}
        intensity={0.65}
        color="#93c5fd"
      />

      {/* High-contrast Rim / Hair Light for edge specular sheen */}
      <directionalLight
        position={[0, 5, -6]}
        intensity={2.2}
        color="#f8fafc"
      />

      {/* Dynamic Product Accent Spotlight */}
      <spotLight
        position={[0, -3, 2]}
        intensity={0.8}
        color={accentColor}
        angle={0.6}
        penumbra={0.8}
      />
    </>
  );
};

// Sleek loading fallback for 3D canvas
export const SceneLoader: React.FC = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#12141c]/80 backdrop-blur-xl border border-white/10 text-center shadow-2xl">
        <div className="relative w-12 h-12 mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping"></div>
          <div className="w-12 h-12 rounded-full border-2 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Calibrating 3D Engine...</p>
      </div>
    </Html>
  );
};

export const ProductScene: React.FC<ProductSceneProps> = ({
  color,
  finish,
  isExploded,
  isFreeOrbit,
  autoRotate,
  currentStageIndex,
  mousePos,
  onPartClick,
}) => {
  const currentStage = CAMERA_STAGES[currentStageIndex] || CAMERA_STAGES[0];

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <Suspense fallback={<SceneLoader />}>
          <StudioLighting accentColor={color.accentHex} />

          {/* Model with dynamic floating or rigid grounding */}
          <Float
            speed={isFreeOrbit ? 1.5 : 0.8}
            rotationIntensity={isFreeOrbit ? 0.2 : 0.08}
            floatIntensity={isFreeOrbit ? 0.3 : 0.12}
            floatingRange={[-0.05, 0.05]}
          >
            <ProductModel
              color={color}
              finish={finish}
              isExploded={isExploded}
              isFreeOrbit={isFreeOrbit}
              autoRotate={autoRotate}
              mousePos={mousePos}
              stageRotationOffset={currentStage.rotationOffset}
              onPartClick={onPartClick}
            />
          </Float>

          {/* Realistic soft floor contact shadow */}
          <ContactShadows
            position={[0, isExploded ? -1.8 : -1.2, 0]}
            opacity={0.75}
            scale={6.5}
            blur={2.4}
            far={4}
            color="#000000"
          />

          {/* Camera Animation Rig during scroll mode */}
          <CameraRig
            currentStage={currentStage}
            isFreeOrbit={isFreeOrbit}
            mousePos={mousePos}
          />

          {/* Interactive Orbit Controls when Free Orbit mode is toggled */}
          {isFreeOrbit && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2.5}
              maxDistance={7.0}
              maxPolarAngle={Math.PI / 1.6}
              minPolarAngle={Math.PI / 6}
              dampingFactor={0.05}
              rotateSpeed={0.8}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
