import React, { useState } from 'react';
import { Cpu, Volume2, Radio, Zap, CheckCircle2, Play, Pause, Activity } from 'lucide-react';
import { PRODUCT_FEATURES } from '../data/productData';
import { ProductColor } from '../types';

interface FeatureGridProps {
  selectedColor: ProductColor;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ selectedColor }) => {
  const [activeFrequency, setActiveFrequency] = useState<number>(60);
  const [isPlayingTestTone, setIsPlayingTestTone] = useState<boolean>(false);

  return (
    <section
      id="features"
      className="relative py-24 sm:py-32 border-t border-white/5 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-amber-400 mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>BREAKTHROUGH ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Designed from First Acoustic Principles.
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Every subsystem is engineered to push beyond conventional physical transducer limitations through high-speed digital signal synthesis.
          </p>
        </div>

        {/* Alternating Feature Blocks */}
        <div className="space-y-20 sm:space-y-28">
          {PRODUCT_FEATURES.map((feature, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={feature.id}
                id={`feature-block-${feature.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 border border-white/10 text-zinc-300">
                    {feature.iconName === 'Cpu' && <Cpu className="w-3.5 h-3.5 text-amber-400" />}
                    {feature.iconName === 'Volume2' && <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
                    {feature.iconName === 'Radio' && <Radio className="w-3.5 h-3.5 text-emerald-400" />}
                    {feature.iconName === 'Zap' && <Zap className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{feature.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2.5 pt-2">
                    {feature.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlight Metric Stat Block */}
                  <div className="pt-4 flex items-baseline gap-4 border-t border-white/10">
                    <span className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                      {feature.metric.value}
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                      {feature.metric.label}
                    </span>
                  </div>
                </div>

                {/* Interactive Schematic Visualizer Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="bg-[#0a0a0f]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
                    {/* Visualizer internal display according to feature type */}
                    {feature.id === 'spatial-dsp' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>12-CHANNEL WAVEFIELD PHASE SYNTHESIS</span>
                          <span className="text-emerald-400">LIVE SYNC 120HZ</span>
                        </div>

                        {/* Interactive Waveform Grid */}
                        <div className="h-44 bg-black/40 rounded-2xl p-4 flex items-end justify-between gap-1.5 border border-white/5">
                          {Array.from({ length: 28 }).map((_, barIdx) => {
                            const heightPercent = 20 + Math.sin((barIdx / 28) * Math.PI * 3 + idx) * 45 + Math.random() * 25;
                            return (
                              <div
                                key={barIdx}
                                className="flex-1 bg-gradient-to-t from-amber-500/20 to-amber-400 rounded-t transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-blue-400"
                                style={{ height: `${Math.max(15, Math.min(95, heightPercent))}%` }}
                              />
                            );
                          })}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Direct Sound Ratio</span>
                            <span className="text-white font-mono font-semibold">99.4% Phase Coherence</span>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Room Reflection Delay</span>
                            <span className="text-white font-mono font-semibold">0.02 ms Compensation</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 'driver-tech' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>FORCE-CANCELING SUBWOOFER VECTOR</span>
                          <span className="text-amber-400">0.003% THD</span>
                        </div>

                        {/* Dual Opposed Driver Diagram */}
                        <div className="h-44 bg-black/40 rounded-2xl p-4 flex items-center justify-around border border-white/5 relative">
                          <div className="w-20 h-28 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-center p-2 animate-pulse">
                            <span className="text-[10px] font-mono text-amber-300 font-bold">LEFT DRIVER<br />← 120W</span>
                          </div>
                          <div className="text-center z-10">
                            <div className="w-8 h-8 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center mx-auto mb-1">
                              = 0
                            </div>
                            <span className="text-[10px] font-mono text-zinc-400">RECOIL FORCE</span>
                          </div>
                          <div className="w-20 h-28 rounded-xl border-2 border-blue-500/40 bg-blue-500/10 flex items-center justify-center text-center p-2 animate-pulse">
                            <span className="text-[10px] font-mono text-blue-300 font-bold">RIGHT DRIVER<br />120W →</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Beryllium Dome Tweeters</span>
                            <span className="text-white font-mono font-semibold">3x 1.0" Pure Metal</span>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Sub-Bass Radiator Excursion</span>
                            <span className="text-white font-mono font-semibold">±16 mm Linear Travel</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 'connectivity' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>WI-FI 7 & LE AUDIO LOW-LATENCY SYNC</span>
                          <span className="text-emerald-400">96kHz / 24-BIT LOSSLESS</span>
                        </div>

                        <div className="h-44 bg-black/40 rounded-2xl p-5 flex flex-col justify-center gap-3 border border-white/5">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-zinc-400">AURA Wireless Sync Latency</span>
                              <span className="text-emerald-400 font-mono font-bold">3.2 ms</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="w-[12%] h-full bg-emerald-400 rounded-full"></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-zinc-500">Standard Bluetooth SBC/AAC</span>
                              <span className="text-zinc-500 font-mono">140 - 220 ms</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="w-[85%] h-full bg-zinc-600 rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Supported Codecs</span>
                            <span className="text-white font-mono font-semibold">LC3plus, FLAC, DSD256</span>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Stereo Pair Sync</span>
                            <span className="text-white font-mono font-semibold">&lt; 10 Microseconds</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 'battery-power' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>SILICON-CARBON POWER DENSITY</span>
                          <span className="text-amber-400">28-HOUR RUNTIME</span>
                        </div>

                        <div className="h-44 bg-black/40 rounded-2xl p-6 flex items-center justify-between border border-white/5">
                          <div className="space-y-2">
                            <span className="text-4xl font-display font-extrabold text-white">28h</span>
                            <p className="text-xs text-zinc-400">Continuous Playback</p>
                          </div>
                          <div className="h-16 w-px bg-white/10"></div>
                          <div className="space-y-2 text-right">
                            <span className="text-4xl font-display font-extrabold text-amber-400">15m</span>
                            <p className="text-xs text-zinc-400">Charge = 8 Hours Play</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Charging Technology</span>
                            <span className="text-white font-mono font-semibold">65W GaN USB-C + Qi2</span>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-zinc-500 block text-[11px]">Cycle Life</span>
                            <span className="text-white font-mono font-semibold">1,500 Full Cycles (85%)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
