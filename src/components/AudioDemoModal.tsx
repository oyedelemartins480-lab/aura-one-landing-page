import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Square, Volume2, Waves, Activity, Sparkles } from 'lucide-react';
import { ProductColor } from '../types';

interface AudioDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: ProductColor;
}

export const AudioDemoModal: React.FC<AudioDemoModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTest, setActiveTest] = useState<'subbass' | 'mids' | 'treble' | 'sweep'>('subbass');
  const [volume, setVolume] = useState(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const panNodeRef = useRef<StereoPannerNode | null>(null);

  // Stop audio when modal closes
  useEffect(() => {
    if (!isOpen && isPlaying) {
      stopAudio();
    }
  }, [isOpen]);

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // ignore
      }
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  const startAudioTest = (testType: 'subbass' | 'mids' | 'treble' | 'sweep') => {
    stopAudio();
    setActiveTest(testType);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.4), ctx.currentTime + 0.1);

      // Stereo panner for spatial feeling
      let panner: StereoPannerNode | null = null;
      if (ctx.createStereoPanner) {
        panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(0, ctx.currentTime);
        panNodeRef.current = panner;
      }

      if (testType === 'subbass') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(32, ctx.currentTime);
      } else if (testType === 'mids') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
      } else if (testType === 'treble') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(8000, ctx.currentTime);
      } else if (testType === 'sweep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(30, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(12000, ctx.currentTime + 3.5);
      }

      if (panner) {
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(ctx.destination);
      }

      osc.start();
      oscRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlaying(true);

      // Auto stop sweeps after 4s
      if (testType === 'sweep') {
        setTimeout(() => {
          stopAudio();
        }, 3600);
      }
    } catch {
      // Audio context error handling
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.4, audioCtxRef.current.currentTime);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="audio-demo-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={() => {
        stopAudio();
        onClose();
      }}
    >
      <div
        id="audio-demo-modal-card"
        className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            stopAudio();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
            ACOUSTIC SYNTHESIS LAB
          </span>
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-2">
          Transducer Calibration Demo
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mb-6">
          Test frequency linearity and harmonic isolation. Use headphones for accurate spatial rendering.
        </p>

        {/* Tone Selection Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <button
            onClick={() => startAudioTest('subbass')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              isPlaying && activeTest === 'subbass'
                ? 'bg-amber-500 text-black border-amber-400 font-semibold shadow-lg'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="text-xs font-mono mb-1">32 Hz Sub-Bass</div>
            <div className="text-[11px] opacity-80">Force-canceling test</div>
          </button>

          <button
            onClick={() => startAudioTest('mids')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              isPlaying && activeTest === 'mids'
                ? 'bg-blue-500 text-white border-blue-400 font-semibold shadow-lg'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="text-xs font-mono mb-1">440 Hz Reference</div>
            <div className="text-[11px] opacity-80">Vocal clarity chamber</div>
          </button>

          <button
            onClick={() => startAudioTest('treble')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              isPlaying && activeTest === 'treble'
                ? 'bg-emerald-500 text-black border-emerald-400 font-semibold shadow-lg'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="text-xs font-mono mb-1">8,000 Hz Treble</div>
            <div className="text-[11px] opacity-80">Beryllium transient ring</div>
          </button>

          <button
            onClick={() => startAudioTest('sweep')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              isPlaying && activeTest === 'sweep'
                ? 'bg-white text-black border-white font-semibold shadow-lg'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="text-xs font-mono mb-1">30Hz – 12kHz Sweep</div>
            <div className="text-[11px] opacity-80">Full dynamic range</div>
          </button>
        </div>

        {/* Volume & Stop Controls */}
        <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>SYNTHESIZER GAIN</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.8"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-amber-400"
          />

          <div className="flex items-center justify-between pt-2">
            {isPlaying ? (
              <button
                onClick={stopAudio}
                className="px-5 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-semibold hover:bg-red-500/30 transition-colors flex items-center gap-2"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Audio Generator</span>
              </button>
            ) : (
              <span className="text-xs text-zinc-500">Select any test profile above to generate tone.</span>
            )}

            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-zinc-300 text-xs font-medium hover:bg-white/20 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
