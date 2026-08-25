import React from 'react';
import { ShoppingBag, ShieldCheck, Sparkles, Truck, RotateCcw } from 'lucide-react';
import { ProductColor } from '../types';

interface CtaSectionProps {
  selectedColor: ProductColor;
  onPreOrderClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  selectedColor,
  onPreOrderClick,
}) => {
  return (
    <section
      id="cta"
      className="relative py-28 sm:py-36 border-t border-white/5 overflow-hidden text-center"
    >
      {/* Dynamic ambient spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none -z-10 opacity-15"
        style={{ backgroundColor: selectedColor.accentHex }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-amber-400 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LIMITED FIRST PRODUCTION RUN // 2,500 UNITS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-tight mb-6">
          Experience Sound <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            Without Compromise.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed mb-10">
          Reserve your {selectedColor.name} edition today. Hand-assembled, individualized frequency certified, and backed by a 30-day studio trial.
        </p>

        {/* Big Centered CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <button
            id="btn-main-cta-preorder"
            onClick={onPreOrderClick}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-base transition-all duration-200 shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center justify-center gap-2.5"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Pre-order AURA ONE — $699</span>
          </button>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Free Express Worldwide Air Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>30-Day Risk-Free Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>3-Year Studio Warranty Included</span>
          </div>
        </div>
      </div>
    </section>
  );
};
