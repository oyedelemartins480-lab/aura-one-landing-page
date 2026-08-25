import React from 'react';
import { Compass, Layers, RotateCw, Sparkles, ChevronDown, Check, Volume2, Maximize2 } from 'lucide-react';
import { ProductColor, FinishType } from '../types';
import { PRODUCT_COLORS } from '../data/productData';

interface HeroSectionProps {
  selectedColor: ProductColor;
  setSelectedColor: (c: ProductColor) => void;
  finish: FinishType;
  setFinish: (f: FinishType) => void;
  isFreeOrbit: boolean;
  setIsFreeOrbit: (v: boolean | ((prev: boolean) => boolean)) => void;
  isExploded: boolean;
  setIsExploded: (v: boolean | ((prev: boolean) => boolean)) => void;
  autoRotate: boolean;
  setAutoRotate: (v: boolean | ((prev: boolean) => boolean)) => void;
  inspectedPart: string | null;
  onPreOrderClick: () => void;
  onAudioDemoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedColor,
  setSelectedColor,
  finish,
  setFinish,
  isFreeOrbit,
  setIsFreeOrbit,
  isExploded,
  setIsExploded,
  autoRotate,
  setAutoRotate,
  inspectedPart,
  onPreOrderClick,
  onAudioDemoClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden"
    >
      {/* Background ambient lighting gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-700" style={{ backgroundColor: `${selectedColor.accentHex}15` }} />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Hero Text */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-zinc-300 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: selectedColor.accentHex }}></span>
          <span>COMPUTATIONAL ACOUSTIC CORE // TITANIUM EDITION</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white mb-5 leading-[1.08]">
          Sound in its <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            purest architectural form.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
          Sculpted from aerospace-grade solid titanium billet. 120Hz neural room calibration and 360° phase-aligned wavefield synthesis for acoustic perfection.
        </p>
      </div>

      {/* Interactive HUD Overlay Floating Controls for 3D Viewport */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-auto z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          {/* Left: Quick Color Swatches with labels */}
          <div className="flex items-center gap-3 bg-[#0a0a0e]/85 backdrop-blur-2xl border border-white/10 p-2 sm:p-2.5 rounded-2xl shadow-2xl">
            <span className="text-xs font-mono uppercase text-zinc-500 pl-2 hidden sm:inline">Finish:</span>
            <div className="flex items-center gap-2">
              {PRODUCT_COLORS.map((c) => {
                const isSelected = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    id={`swatch-hero-${c.id}`}
                    onClick={() => setSelectedColor(c)}
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#050505] scale-110'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name} (${c.subname})`}
                  >
                    {isSelected && (
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: c.accentHex }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block"></div>
            <span className="text-xs font-medium text-zinc-300 pr-2 hidden sm:inline truncate max-w-[140px]">
              {selectedColor.name}
            </span>
          </div>

          {/* Center: Inspected Part notification or Mouse movement hint */}
          <div className="hidden lg:flex items-center gap-2 bg-[#0a0a0e]/75 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-xs text-zinc-400">
            {inspectedPart ? (
              <span className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Inspecting: <strong>{inspectedPart}</strong></span>
              </span>
            ) : isFreeOrbit ? (
              <span className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span>Drag to rotate 360° // Scroll to zoom in/out</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Move cursor to tilt model // Scroll down for architectural breakdown</span>
              </span>
            )}
          </div>

          {/* Right: Viewport Mode Toggles & CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              id="btn-hero-audio-demo"
              onClick={onAudioDemoClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-zinc-200 transition-all active:scale-95"
              title="Listen to 3D Acoustic Resonance Simulator"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Acoustic Test</span>
            </button>

            <button
              id="btn-hero-orbit-toggle"
              onClick={() => setIsFreeOrbit(prev => !prev)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                isFreeOrbit
                  ? 'bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{isFreeOrbit ? 'Orbiting' : '360° Orbit'}</span>
            </button>

            <button
              id="btn-hero-explode-toggle"
              onClick={() => setIsExploded(prev => !prev)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                isExploded
                  ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20 font-semibold'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isExploded ? 'Assembled' : 'Exploded View'}</span>
            </button>

            <button
              id="btn-hero-preorder-main"
              onClick={onPreOrderClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-white/20 active:scale-95"
            >
              <span>Pre-order</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center justify-center pt-8 text-zinc-500">
          <a
            href="#story-sequence"
            className="flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase hover:text-zinc-300 transition-colors"
          >
            <span>Scroll To Inspect</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-zinc-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
