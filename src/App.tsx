/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductScene } from './components/3d/ProductScene';
import { ScrollStorySection } from './components/ScrollStorySection';
import { ColorCustomizer } from './components/ColorCustomizer';
import { FeatureGrid } from './components/FeatureGrid';
import { SpecsSection } from './components/SpecsSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { PreOrderModal } from './components/PreOrderModal';
import { AudioDemoModal } from './components/AudioDemoModal';
import { PRODUCT_COLORS } from './data/productData';
import { ProductColor, FinishType } from './types';

export default function App() {
  // 3D Canvas State
  const [selectedColor, setSelectedColor] = useState<ProductColor>(PRODUCT_COLORS[0]);
  const [finish, setFinish] = useState<FinishType>('matte');
  const [isFreeOrbit, setIsFreeOrbit] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [inspectedPart, setInspectedPart] = useState<string | null>(null);

  // Modals
  const [isPreOrderOpen, setIsPreOrderOpen] = useState<boolean>(false);
  const [isAudioDemoOpen, setIsAudioDemoOpen] = useState<boolean>(false);

  // Track mouse coordinates for smooth 3D parallax tilt
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Scroll listener to update architectural inspection stage automatically
  useEffect(() => {
    const handleScroll = () => {
      const storyEl = document.getElementById('story-sequence');
      if (!storyEl) return;

      const rect = storyEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If within story section viewport
      if (rect.top <= windowHeight * 0.5 && rect.bottom >= 0) {
        const totalHeight = rect.height;
        const progress = Math.max(0, Math.min(1, (windowHeight * 0.5 - rect.top) / totalHeight));
        const stage = Math.min(3, Math.floor(progress * 4));
        setCurrentStageIndex(stage);
      } else if (rect.top > windowHeight * 0.5) {
        setCurrentStageIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle 3D Part click
  const handlePartClick = (partName: string) => {
    setInspectedPart(partName);
    setTimeout(() => {
      setInspectedPart(null);
    }, 4000);
  };

  const handleResetCustomizer = () => {
    setSelectedColor(PRODUCT_COLORS[0]);
    setFinish('matte');
    setIsExploded(false);
    setIsFreeOrbit(false);
    setAutoRotate(true);
    setCurrentStageIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] relative selection:bg-amber-500/30 selection:text-amber-200 antialiased overflow-x-hidden">
      {/* Studio Header */}
      <Header
        selectedColor={selectedColor}
        isFreeOrbit={isFreeOrbit}
        setIsFreeOrbit={setIsFreeOrbit}
        isExploded={isExploded}
        setIsExploded={setIsExploded}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        onPreOrderClick={() => setIsPreOrderOpen(true)}
      />

      {/* Main Hero & 3D Stage Container */}
      <div className="relative w-full">
        {/* 3D Canvas Stage Container */}
        <div className="h-[520px] sm:h-[650px] lg:h-[750px] w-full max-w-6xl mx-auto relative px-4 z-10">
          <ProductScene
            color={selectedColor}
            finish={finish}
            isExploded={isExploded}
            isFreeOrbit={isFreeOrbit}
            autoRotate={autoRotate}
            currentStageIndex={currentStageIndex}
            mousePos={mousePos}
            onPartClick={handlePartClick}
          />
        </div>

        {/* Hero Content & Quick HUD Controls */}
        <div className="relative -mt-[480px] sm:-mt-[600px] lg:-mt-[700px] z-20 pointer-events-auto">
          <HeroSection
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            finish={finish}
            setFinish={setFinish}
            isFreeOrbit={isFreeOrbit}
            setIsFreeOrbit={setIsFreeOrbit}
            isExploded={isExploded}
            setIsExploded={setIsExploded}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            inspectedPart={inspectedPart}
            onPreOrderClick={() => setIsPreOrderOpen(true)}
            onAudioDemoClick={() => setIsAudioDemoOpen(true)}
          />
        </div>
      </div>

      {/* 2. Scroll-Driven Camera Sequence / Architectural Stages */}
      <ScrollStorySection
        currentStageIndex={currentStageIndex}
        setCurrentStageIndex={setCurrentStageIndex}
        selectedColor={selectedColor}
        onExploreFreeOrbit={() => {
          setIsFreeOrbit(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. Color & Variant Swatch Picker */}
      <ColorCustomizer
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        finish={finish}
        setFinish={setFinish}
        onPreOrderClick={() => setIsPreOrderOpen(true)}
        onResetCustomizer={handleResetCustomizer}
      />

      {/* 4. Feature Highlights */}
      <FeatureGrid selectedColor={selectedColor} />

      {/* 5. Precision Technical Specifications */}
      <SpecsSection selectedColor={selectedColor} />

      {/* 6. Closing Call to Action */}
      <CtaSection
        selectedColor={selectedColor}
        onPreOrderClick={() => setIsPreOrderOpen(true)}
      />

      {/* Footer */}
      <Footer
        selectedColor={selectedColor}
        onPreOrderClick={() => setIsPreOrderOpen(true)}
      />

      {/* Pre-Order Modal */}
      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        finish={finish}
        setFinish={setFinish}
      />

      {/* Acoustic Frequency Demo Modal */}
      <AudioDemoModal
        isOpen={isAudioDemoOpen}
        onClose={() => setIsAudioDemoOpen(false)}
        selectedColor={selectedColor}
      />
    </div>
  );
}
