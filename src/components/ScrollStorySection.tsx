import React from 'react';
import { Sparkles, Shield, Cpu, Disc, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { CameraStage, ProductColor } from '../types';
import { CAMERA_STAGES } from '../data/productData';

interface ScrollStorySectionProps {
  currentStageIndex: number;
  setCurrentStageIndex: (index: number) => void;
  selectedColor: ProductColor;
  onExploreFreeOrbit: () => void;
}

export const ScrollStorySection: React.FC<ScrollStorySectionProps> = ({
  currentStageIndex,
  setCurrentStageIndex,
  selectedColor,
  onExploreFreeOrbit,
}) => {
  return (
    <section
      id="story-sequence"
      className="relative py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-amber-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GUIDED CAMERA SEQUENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Anatomy of Acoustic <br />
              <span className="text-zinc-400">Mastery.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every millimeter is mathematically calculated to eliminate internal standing waves and project an ultra-wide holographic soundstage.
          </p>
        </div>

        {/* Stage Selection Tabs / Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {CAMERA_STAGES.map((stage, idx) => {
            const isActive = currentStageIndex === idx;
            return (
              <button
                key={stage.id}
                id={`btn-stage-tab-${stage.id}`}
                onClick={() => setCurrentStageIndex(idx)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-[#121218] border-white/30 shadow-xl'
                    : 'bg-[#0a0a0f]/70 border-white/5 hover:border-white/15 hover:bg-[#101016]'
                }`}
              >
                {/* Active progress accent line */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: selectedColor.accentHex }}
                  />
                )}
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">
                  {stage.tag}
                </span>
                <h4 className={`text-sm font-semibold tracking-wide ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {stage.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Highlight Card */}
        {CAMERA_STAGES[currentStageIndex] && (
          <div className="bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient corner light */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
              style={{ backgroundColor: selectedColor.accentHex }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Stage Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                    style={{
                      backgroundColor: `${selectedColor.accentHex}20`,
                      color: selectedColor.accentHex,
                    }}
                  >
                    {CAMERA_STAGES[currentStageIndex].tag}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    CAMERA ORBIT: [{CAMERA_STAGES[currentStageIndex].cameraPosition.join(', ')}]
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                  {CAMERA_STAGES[currentStageIndex].headline}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                  {CAMERA_STAGES[currentStageIndex].description}
                </p>

                {/* Specs Pill Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  {CAMERA_STAGES[currentStageIndex].specs.map((spec, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-xl p-3.5"
                    >
                      <div className="text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        {spec.label}
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Navigation & Inspection Switcher */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Interactive Viewport Controls:
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal">
                    The 3D model automatically orients to the selected inspection vector. You can also disengage camera locking to orbit freely.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      id="btn-prev-stage"
                      onClick={() =>
                        setCurrentStageIndex(
                          (currentStageIndex - 1 + CAMERA_STAGES.length) % CAMERA_STAGES.length
                        )
                      }
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 text-center transition-colors"
                    >
                      ← Previous Angle
                    </button>
                    <button
                      id="btn-next-stage"
                      onClick={() =>
                        setCurrentStageIndex((currentStageIndex + 1) % CAMERA_STAGES.length)
                      }
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white text-center transition-colors"
                    >
                      Next Angle →
                    </button>
                  </div>

                  <button
                    id="btn-stage-switch-free-orbit"
                    onClick={onExploreFreeOrbit}
                    className="w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
                  >
                    <span>Switch to 360° Free Studio Orbit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
