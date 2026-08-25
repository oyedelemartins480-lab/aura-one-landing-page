import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Layers, ShoppingBag, Menu, X, RotateCw } from 'lucide-react';
import { ProductColor } from '../types';

interface HeaderProps {
  selectedColor: ProductColor;
  isFreeOrbit: boolean;
  setIsFreeOrbit: (v: boolean | ((prev: boolean) => boolean)) => void;
  isExploded: boolean;
  setIsExploded: (v: boolean | ((prev: boolean) => boolean)) => void;
  autoRotate: boolean;
  setAutoRotate: (v: boolean | ((prev: boolean) => boolean)) => void;
  onPreOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedColor,
  isFreeOrbit,
  setIsFreeOrbit,
  isExploded,
  setIsExploded,
  autoRotate,
  setAutoRotate,
  onPreOrderClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: selectedColor.hex }}
            >
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: selectedColor.accentHex }}
              />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
                AURA <span className="text-zinc-400 font-light">ONE</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a
              href="#hero"
              className="hover:text-white transition-colors"
            >
              Overview
            </a>
            <a
              href="#story-sequence"
              className="hover:text-white transition-colors"
            >
              Architecture
            </a>
            <a
              href="#features"
              className="hover:text-white transition-colors"
            >
              Engineering
            </a>
            <a
              href="#customizer"
              className="hover:text-white transition-colors"
            >
              Finishes
            </a>
            <a
              href="#specs"
              className="hover:text-white transition-colors"
            >
              Specs
            </a>
          </nav>

          {/* Action Tools & Pre-Order Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick 3D mode toggles in header */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 text-xs">
              <button
                id="btn-header-orbit-toggle"
                onClick={() => setIsFreeOrbit(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                  isFreeOrbit
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Toggle 360° Free Orbit Interaction"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>360° Orbit</span>
              </button>

              <button
                id="btn-header-explode-toggle"
                onClick={() => setIsExploded(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                  isExploded
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Toggle Exploded Engineering View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explode</span>
              </button>

              <button
                id="btn-header-autorotate-toggle"
                onClick={() => setAutoRotate(prev => !prev)}
                className={`p-1.5 rounded-full transition-all ${
                  autoRotate
                    ? 'text-amber-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="Toggle Auto-Rotation"
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
              </button>
            </div>

            {/* Pre-Order CTA Button */}
            <button
              id="btn-header-preorder"
              onClick={onPreOrderClick}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-black bg-white hover:bg-zinc-200 transition-all duration-200 shadow-lg hover:shadow-white/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pre-order — $699</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 pb-3 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-zinc-300 hover:text-white text-base"
            >
              Overview
            </a>
            <a
              href="#story-sequence"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-zinc-300 hover:text-white text-base"
            >
              Architecture
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-zinc-300 hover:text-white text-base"
            >
              Engineering
            </a>
            <a
              href="#customizer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-zinc-300 hover:text-white text-base"
            >
              Finishes & Colors
            </a>
            <a
              href="#specs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-zinc-300 hover:text-white text-base"
            >
              Technical Specs
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsFreeOrbit(prev => !prev);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                    isFreeOrbit ? 'bg-white text-black border-white' : 'bg-white/5 text-zinc-300 border-white/10'
                  }`}
                >
                  <Compass className="w-4 h-4" /> 360° Free Orbit
                </button>
                <button
                  onClick={() => {
                    setIsExploded(prev => !prev);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                    isExploded ? 'bg-amber-500 text-black border-amber-500' : 'bg-white/5 text-zinc-300 border-white/10'
                  }`}
                >
                  <Layers className="w-4 h-4" /> Explode View
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPreOrderClick();
                }}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Pre-order AURA ONE ($699)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
