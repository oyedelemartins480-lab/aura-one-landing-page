import React from 'react';
import { ProductColor } from '../types';

interface FooterProps {
  selectedColor: ProductColor;
  onPreOrderClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ selectedColor, onPreOrderClick }) => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-zinc-500 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1 */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center border border-white/20"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedColor.accentHex }} />
              </div>
              <span className="font-display font-bold text-white text-base tracking-wider">
                AURA ONE
              </span>
            </div>
            <p className="text-zinc-400 max-w-sm text-xs leading-relaxed">
              Computational acoustic instruments designed for pristine spatial immersion. Engineered in California.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-mono uppercase text-zinc-400 font-semibold mb-3 tracking-wider text-[11px]">
              Explore
            </h5>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-zinc-300 transition-colors">Overview</a></li>
              <li><a href="#story-sequence" className="hover:text-zinc-300 transition-colors">Architecture</a></li>
              <li><a href="#features" className="hover:text-zinc-300 transition-colors">Engineering</a></li>
              <li><a href="#customizer" className="hover:text-zinc-300 transition-colors">Studio Finishes</a></li>
              <li><a href="#specs" className="hover:text-zinc-300 transition-colors">Tech Specs</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-mono uppercase text-zinc-400 font-semibold mb-3 tracking-wider text-[11px]">
              Acoustics
            </h5>
            <ul className="space-y-2">
              <li><span className="text-zinc-400">Pure Beryllium Tweeters</span></li>
              <li><span className="text-zinc-400">Dual Opposed Subwoofers</span></li>
              <li><span className="text-zinc-400">120Hz LiDAR Room Mapping</span></li>
              <li><span className="text-zinc-400">96kHz/24-bit Lossless Wi-Fi</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="font-mono uppercase text-zinc-400 font-semibold mb-3 tracking-wider text-[11px]">
              Order & Care
            </h5>
            <ul className="space-y-2">
              <li><button onClick={onPreOrderClick} className="text-white hover:underline text-left">Reserve Unit ($699)</button></li>
              <li><span className="text-zinc-400">3-Year Studio Care</span></li>
              <li><span className="text-zinc-400">Express Air Shipping</span></li>
              <li><span className="text-zinc-400">30-Day Trial Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600">
          <div>
            © {new Date().getFullYear()} AURA Acoustic Laboratories Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Acoustic Patent Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
