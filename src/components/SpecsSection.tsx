import React, { useState } from 'react';
import { Sliders, Download, Check, Copy, FileText } from 'lucide-react';
import { PRODUCT_SPECS } from '../data/productData';
import { ProductColor } from '../types';

interface SpecsSectionProps {
  selectedColor: ProductColor;
}

export const SpecsSection: React.FC<SpecsSectionProps> = ({ selectedColor }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopySpecs = () => {
    const specsString = PRODUCT_SPECS.map(
      (cat) =>
        `--- ${cat.category} ---\n` +
        cat.items.map((item) => `${item.label}: ${item.value}`).join('\n')
    ).join('\n\n');

    navigator.clipboard.writeText(specsString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="specs"
      className="relative py-24 sm:py-32 border-t border-white/5 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-amber-400 mb-4">
              <Sliders className="w-3.5 h-3.5" />
              <span>TECHNICAL SPECIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Precision Metrics.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-copy-specs"
              onClick={handleCopySpecs}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Specs' : 'Copy All Specs'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
          {PRODUCT_SPECS.map((specCat, idx) => (
            <button
              key={specCat.category}
              id={`btn-spec-tab-${idx}`}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === idx
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {specCat.category}
            </button>
          ))}
        </div>

        {/* Specification Table */}
        <div className="bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="divide-y divide-white/10">
            {PRODUCT_SPECS[activeTab].items.map((item, idx) => (
              <div
                key={idx}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-white/[0.02] transition-colors px-2 rounded-xl"
              >
                <div className="md:col-span-4 text-sm font-semibold text-zinc-300 font-display">
                  {item.label}
                </div>
                <div className="md:col-span-8 text-sm text-zinc-400 font-normal leading-relaxed">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Box Contents Callout */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
          <h4 className="text-sm font-mono tracking-wider uppercase text-zinc-400 mb-4">
            In The Box
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-300">
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
              <span className="font-semibold text-white block mb-1">AURA ONE</span>
              <span>Selected {selectedColor.name} Enclosure</span>
            </div>
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
              <span className="font-semibold text-white block mb-1">Braided Cable</span>
              <span>2.0m USB-C to USB-C (100W PD)</span>
            </div>
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
              <span className="font-semibold text-white block mb-1">GaN Power Adapter</span>
              <span>65W Ultra-Compact Charger</span>
            </div>
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
              <span className="font-semibold text-white block mb-1">Documentation</span>
              <span>Certificate of Acoustic Calibration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
