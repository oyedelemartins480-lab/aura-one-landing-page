import React, { useState } from 'react';
import { Palette, Check, Sparkles, Sliders, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ProductColor, FinishType } from '../types';
import { PRODUCT_COLORS } from '../data/productData';

interface ColorCustomizerProps {
  selectedColor: ProductColor;
  setSelectedColor: (c: ProductColor) => void;
  finish: FinishType;
  setFinish: (f: FinishType) => void;
  onPreOrderClick: () => void;
  onResetCustomizer: () => void;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  selectedColor,
  setSelectedColor,
  finish,
  setFinish,
  onPreOrderClick,
  onResetCustomizer,
}) => {
  const [engravingText, setEngravingText] = useState('');

  const finishOptions: { id: FinishType; label: string; desc: string }[] = [
    { id: 'matte', label: 'Obsidian Matte', desc: 'Non-reflective micro-textured surface' },
    { id: 'brushed', label: 'Brushed Anodized', desc: 'Directional grain with deep metal sheen' },
    { id: 'ceramic', label: 'Mirror Ceramic', desc: 'Ultra-high clearcoat with zirconia luster' },
  ];

  return (
    <section
      id="customizer"
      className="relative py-24 sm:py-32 border-t border-white/5 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-amber-400 mb-4">
            <Palette className="w-3.5 h-3.5" />
            <span>STUDIO CUSTOMIZER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Curate Your Acoustic Identity.
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Select from aerospace titanium alloys and zirconia ceramics. The 3D model above updates instantly with dynamic physically-based material shading.
          </p>
        </div>

        {/* Customization Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Color and Finish Selection */}
          <div className="lg:col-span-7 space-y-8">
            {/* Color Swatches Grid */}
            <div className="bg-[#0a0a0f]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-display font-semibold text-white">
                    1. Select Enclosure Material & Hue
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Currently inspecting: <span className="text-white font-medium">{selectedColor.name}</span>
                  </p>
                </div>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedColor.accentHex }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PRODUCT_COLORS.map((c) => {
                  const isSelected = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      id={`customizer-color-${c.id}`}
                      onClick={() => setSelectedColor(c)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 ${
                        isSelected
                          ? 'bg-white/10 border-white/40 shadow-lg scale-[1.02]'
                          : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                      }`}
                    >
                      {/* Swatch circle */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 shadow-md"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: c.accentHex }}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {c.name}
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                        </div>
                        <p className="text-xs text-zinc-400 truncate mt-0.5">
                          {c.subname}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Color Description Note */}
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 leading-relaxed">
                {selectedColor.description}
              </div>
            </div>

            {/* Finish Selector */}
            <div className="bg-[#0a0a0f]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-display font-semibold text-white mb-2">
                2. Surface Finish Treatment
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Adjust the microscopic light dispersion and tactile friction of the enclosure.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {finishOptions.map((opt) => {
                  const isSelected = finish === opt.id;
                  return (
                    <button
                      key={opt.id}
                      id={`customizer-finish-${opt.id}`}
                      onClick={() => setFinish(opt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-lg font-medium'
                          : 'bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold">{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Laser Engraving Option */}
            <div className="bg-[#0a0a0f]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-display font-semibold text-white">
                  3. Complimentary Laser Engraving
                </h3>
                <span className="text-xs font-mono uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  Free
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-4">
                Precision laser-etched onto the lower titanium bezel perimeter (Max 24 characters).
              </p>

              <div className="relative">
                <input
                  type="text"
                  maxLength={24}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. STUDIO ONE // ACOUSTIC LAB"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                />
                <span className="absolute right-3 top-3.5 text-xs text-zinc-500 font-mono">
                  {engravingText.length}/24
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration Summary & Order Spec Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#0a0a0f] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
                    CONFIGURED EDITION
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-1">
                    AURA ONE
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-extrabold text-white">
                    $699
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">In Stock // Ships Nov 2026</span>
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-400">Chassis Material</span>
                  <span className="text-white font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-400">Surface Texture</span>
                  <span className="text-white font-medium capitalize">{finish} Polish</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-400">Illumination Accent</span>
                  <span className="text-white font-mono">{selectedColor.accentHex}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-400">Laser Engraving</span>
                  <span className="text-amber-400 font-mono">{engravingText || 'None (Standard)'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-400">Warranty Protection</span>
                  <span className="text-white font-medium">3-Year Studio Care Included</span>
                </div>
              </div>

              {/* Perks Highlights */}
              <div className="bg-white/5 rounded-2xl p-4 space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-zinc-400" />
                  <span>Free Worldwide Express Air Shipping</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  <span>30-Day Risk-Free Studio Acoustic Trial</span>
                </div>
              </div>

              {/* Order Button */}
              <button
                id="btn-customizer-preorder"
                onClick={onPreOrderClick}
                className="w-full py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-semibold text-base transition-all shadow-xl hover:shadow-white/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Reserve {selectedColor.name} — $699</span>
              </button>

              <button
                onClick={onResetCustomizer}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center justify-center gap-1.5 pt-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Default</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
