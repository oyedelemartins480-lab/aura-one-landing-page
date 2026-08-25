import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Sparkles, Truck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProductColor, FinishType } from '../types';
import { PRODUCT_COLORS } from '../data/productData';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: ProductColor;
  setSelectedColor: (c: ProductColor) => void;
  finish: FinishType;
  setFinish: (f: FinishType) => void;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
  setSelectedColor,
  finish,
  setFinish,
}) => {
  const [includeDock, setIncludeDock] = useState(false);
  const [includeTravelCase, setIncludeTravelCase] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const basePrice = 699;
  const dockPrice = includeDock ? 89 : 0;
  const casePrice = includeTravelCase ? 59 : 0;
  const totalPrice = basePrice + dockPrice + casePrice;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [selectedColor.accentHex, '#ffffff', '#38bdf8', '#fbbf24'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div
      id="preorder-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="preorder-modal-card"
        className="relative w-full max-w-xl bg-[#0a0a0f] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-preorder-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                PRE-ORDER RESERVATION
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Configure AURA ONE
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Batch #01 Production: Expected delivery November 2026. Zero upfront charge until dispatch.
            </p>

            <form onSubmit={handleConfirmReservation} className="space-y-6">
              {/* Select Color Swatch */}
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-2.5">
                  Selected Enclosure: <strong className="text-white">{selectedColor.name}</strong>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {PRODUCT_COLORS.map((c) => {
                    const isSelected = c.id === selectedColor.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className={`h-12 rounded-xl border flex flex-col items-center justify-center relative transition-all ${
                          isSelected
                            ? 'border-white bg-white/15 scale-105 shadow-md'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: c.hex }}
                        />
                        {isSelected && (
                          <span
                            className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: c.accentHex }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-2.5">
                  Studio Accessories (Optional)
                </label>
                <div className="space-y-2.5">
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      includeDock ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/5 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeDock}
                        onChange={(e) => setIncludeDock(e.target.checked)}
                        className="rounded border-zinc-700 bg-black/40 text-amber-500 focus:ring-0 w-4 h-4"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Qi2 Magnetic Fast-Charging Base
                        </div>
                        <div className="text-xs text-zinc-400">
                          Weighted solid aluminum dock with USB-C passthrough
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-mono text-zinc-200">+$89</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      includeTravelCase ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/5 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeTravelCase}
                        onChange={(e) => setIncludeTravelCase(e.target.checked)}
                        className="rounded border-zinc-700 bg-black/40 text-amber-500 focus:ring-0 w-4 h-4"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">
                          AeroArmor Hard Flight Case
                        </div>
                        <div className="text-xs text-zinc-400">
                          IP68 ballistic shell with laser-cut acoustic foam
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-mono text-zinc-200">+$59</span>
                  </label>
                </div>
              </div>

              {/* Customer Email Input */}
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">
                  Delivery Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="sound.engineer@studio.com"
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Pricing breakdown */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Total Due at Dispatch</span>
                  <span className="text-2xl font-display font-bold text-white">${totalPrice}</span>
                </div>
                <button
                  type="submit"
                  id="btn-confirm-preorder-submit"
                  className="px-8 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-sm transition-all shadow-xl active:scale-95 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Confirm Reservation</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Reservation Confirmed!
            </h3>

            <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              We have allocated unit <strong>#0418</strong> in <strong>{selectedColor.name}</strong> for you. A production schedule update has been dispatched to <strong>{customerEmail || 'your email'}</strong>.
            </p>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-zinc-400 max-w-sm mx-auto space-y-1">
              <div>Serial Allocation: <strong className="text-white font-mono">AU-1-TITAN-0418</strong></div>
              <div>Estimated Delivery: <strong className="text-emerald-400">November 12-16, 2026</strong></div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors"
            >
              Back to 3D Showcase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
