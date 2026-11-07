import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { OrangeHorizonLight } from '../components/OrangeHorizonLight';
import {
  SplitTextReveal,
  ColonTitle,
  Magnetic,
} from '../components/AnimatedText';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Grail's Witty Real-Time Email Validation Logic (Dn in grail-home.js)
function evaluateEmailBubble(raw) {
  const val = raw.trim();
  if (!val) return { mode: 'hidden' };
  if (/^(https?:\/\/|www\.)/i.test(val)) {
    return { mode: 'text', text: "that's a website, not an email." };
  }
  if (/\s/.test(val)) {
    return { mode: 'text', text: "emails don't have spaces." };
  }
  const atCount = (val.match(/@/g) || []).length;
  if (atCount > 1) {
    return { mode: 'text', text: 'one @ is plenty.' };
  }
  if (atCount === 0) {
    const lower = val.toLowerCase();
    const isMash = ['qwerty', 'asdfgh', 'zxcvbn', '123456'].some((seq) =>
      lower.includes(seq)
    );
    return {
      mode: 'text',
      text: isMash ? "nice try. that's just mashing." : "that's not an email yet. keep going.",
    };
  }
  const [local, domain] = val.split('@');
  if (!local) return { mode: 'text', text: 'nothing before the @?' };
  if (!domain) return { mode: 'text', text: '@ which campus?' };
  if (val.includes('..')) return { mode: 'text', text: 'one dot at a time.' };
  if (!/\.[a-z]{2,}$/i.test(domain)) {
    return { mode: 'text', text: 'almost. give it a .in or .com' };
  }
  if (EMAIL_RE.test(val)) {
    return { mode: 'enter' };
  }
  return { mode: 'text', text: "that's not quite an email." };
}

const PLACEHOLDER_TEXT = 'Your College Email';

export function FinalCTA() {
  const navigate = useNavigate();
  const tileRef = useRef(null);
  const sectionRef = useRef(null);

  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'done'
  const [bubble, setBubble] = useState({ mode: 'hidden' });
  const [inView, setInView] = useState(false);

  // Observe section for Grail's .foot-live line & tile reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Grail Cursor-Tracked Radial Light on Emblem Tile (vn in grail-home.js)
  useEffect(() => {
    const tileEl = tileRef.current;
    if (!tileEl) return;

    const onPointerMove = (e) => {
      const rect = tileEl.getBoundingClientRect();
      if (!rect.width) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const lx = Math.max(15, Math.min(85, 45 + ((e.clientX - cx) / rect.width) * 35));
      const ly = Math.max(15, Math.min(85, 32 + ((e.clientY - cy) / rect.height) * 35));
      tileEl.style.setProperty('--lx', `${lx.toFixed(1)}%`);
      tileEl.style.setProperty('--ly', `${ly.toFixed(1)}%`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  // Grail Real-Time Speech Bubble Update
  useEffect(() => {
    if (!email.trim()) {
      setBubble({ mode: 'hidden' });
      return undefined;
    }
    const timer = setTimeout(() => {
      setBubble(evaluateEmailBubble(email));
    }, 280);
    return () => clearTimeout(timer);
  }, [email]);

  // Idle listening prompt after 2.2s if still typing incomplete email
  useEffect(() => {
    if (bubble.mode !== 'text' || bubble.idle) return undefined;
    const timer = setTimeout(() => {
      setBubble({ mode: 'text', text: "we're listening", idle: true });
    }, 2200);
    return () => clearTimeout(timer);
  }, [bubble]);

  // Compute deterministic tilt from email string like Grail's s*31 + charCode
  const tiltDeg = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = (hash * 31 + email.charCodeAt(i)) | 0;
    }
    return (Math.abs(hash) % 11) - 5;
  }, [email]);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    const res = evaluateEmailBubble(email);
    if (res.mode !== 'enter') {
      setBubble(res);
      return;
    }
    setStatus('done');
    setBubble({ mode: 'hidden' });
  };

  return (
    <section
      ref={sectionRef}
      id="footer-waitlist"
      className="py-24 sm:py-32 relative overflow-hidden text-center bg-[#070709]"
    >
      {/* Volumetric Light Rays Aura Behind Tile (_rays_jyv7u_69) */}
      <div
        aria-hidden="true"
        style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
        }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[540px] h-[340px] bg-radial-[circle,rgba(255,107,0,0.22)_0%,rgba(245,158,11,0.06)_45%,transparent_72%] blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Grail ColonTitle Chapter Header */}
        <ColonTitle
          label="Get In Early • Student Network"
          chapter="Chapter 08"
          accent
        />

        {/* Grail Cursor-Lit 3D Emblem Tile (_tile_jyv7u_87) */}
        <div className="flex justify-center mt-8 mb-8">
          <motion.div
            ref={tileRef}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                'radial-gradient(120% 120% at var(--lx, 45%) var(--ly, 32%), #FFD2A6 0%, #FF8533 52%, #FF6B00 100%)',
            }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] flex items-center justify-center shadow-[0_20px_60px_rgba(255,107,0,0.42),inset_0_1px_2px_rgba(255,255,255,0.65)] select-none"
          >
            <svg viewBox="0 0 48 48" className="w-14 h-14 fill-none">
              <circle cx="24" cy="24" r="17" stroke="#120B07" strokeWidth="3.2" />
              <line
                x1="12"
                y1="36"
                x2="36"
                y2="12"
                stroke="#120B07"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Grail Lead & Pitch (_lead_jyv7u_43 & _pitch_jyv7u_44) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-semibold text-zinc-300 mb-5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>STOP MEANING TO. START BUILDING WITH SENIORS.</span>
        </motion.div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06] mb-4 max-w-3xl mx-auto">
          <SplitTextReveal text="Ready to learn directly" /> <br />
          <span className="text-zinc-400">
            <SplitTextReveal text="from campus" delay={0.18} />{' '}
          </span>
          <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.12em]">
            seniors?
          </span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mb-12 max-w-md mx-auto leading-relaxed">
          Drop your college email below for instant cohort alerts, or jump straight into live campus bootcamps.
        </p>

        {/* GRAIL MONUMENTAL EDITORIAL EMAIL INPUT + TILTING SPEECH BUBBLE (_formZone_jyv7u_45) */}
        <div className="max-w-4xl mx-auto my-10 px-2 sm:px-6">
          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="py-6 space-y-4"
            >
              <p className="font-grail-serif text-[clamp(42px,6.4vw,88px)] text-[#FF6B00] leading-[0.88]">
                You&apos;re in.
              </p>
              <p className="text-sm text-zinc-400 font-medium">
                We&apos;ll ping you the moment new cohorts open at your campus.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEmail('');
                  setStatus('idle');
                }}
                className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Add another email
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="relative flex flex-col items-center">
              <div className="relative w-full">
                {/* Floating Witty Speech Bubble (_bubbleWrap_jyv7u_279) */}
                {bubble.mode !== 'hidden' && (
                  <div className="grail-bubble-float absolute -top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div
                      style={{
                        transform:
                          bubble.mode === 'enter'
                            ? 'rotate(0deg)'
                            : `rotate(${tiltDeg}deg)`,
                      }}
                      className={`grail-bubble-pop pointer-events-auto relative flex items-center justify-center font-heading font-semibold text-sm text-[#120B07] bg-gradient-to-r from-[#FFB87A] to-[#FF6B00] shadow-[0_14px_34px_rgba(255,107,0,0.45)] transition-all duration-300 ${
                        bubble.mode === 'enter'
                          ? 'w-20 h-14 rounded-full px-0 cursor-pointer hover:scale-105'
                          : 'h-12 px-5 rounded-[24px] whitespace-nowrap'
                      }`}
                    >
                      {bubble.mode === 'enter' ? (
                        <button
                          type="submit"
                          aria-label="Submit email"
                          className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#120B07] cursor-pointer"
                        >
                          ↵
                        </button>
                      ) : (
                        <span className="flex items-center">
                          <span>{bubble.text}</span>
                          {bubble.idle && (
                            <span className="inline-flex items-center gap-1 ml-2">
                              <i className="grail-dot" />
                              <i className="grail-dot" />
                              <i className="grail-dot" />
                            </span>
                          )}
                        </span>
                      )}

                      {/* Bubble Tail */}
                      {bubble.mode !== 'enter' && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF8533] rotate-45"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Giant Editorial Input (_emailInput_jyv7u_165) */}
                <input
                  type="email"
                  required
                  aria-label="Your college email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={(e) => setFocused(e.target.value.length > 0)}
                  className="w-full text-center font-grail-serif text-[clamp(32px,5.6vw,82px)] text-white bg-transparent border-0 outline-none pb-3 tracking-[-0.01em] leading-[0.88] uppercase placeholder-transparent focus:ring-0"
                />

                {/* Per-Letter Wave-In Placeholder (_ph_jyv7u_19) */}
                {!focused && !email && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center pb-3 font-grail-serif text-[clamp(32px,5.6vw,82px)] text-white/35 tracking-[-0.01em] leading-[0.88] select-none"
                  >
                    {[...PLACEHOLDER_TEXT].map((ch, idx) => {
                      const distFromCenter = Math.abs(idx - PLACEHOLDER_TEXT.length / 2);
                      return ch === ' ' ? (
                        <span key={idx}>&nbsp;</span>
                      ) : (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: '0.5em' }}
                          animate={inView ? { opacity: 1, y: '0em' } : {}}
                          transition={{
                            duration: 0.5,
                            delay: 0.25 + distFromCenter * 0.045,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="inline-block"
                        >
                          {ch}
                        </motion.span>
                      );
                    })}
                  </span>
                )}

                {/* Center-Out Growing Underline (_line_jyv7u_170) */}
                <span
                  aria-hidden="true"
                  style={{
                    transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s',
                  }}
                  className={`block h-[1.5px] w-full origin-center transition-colors duration-300 ${
                    focused ? 'bg-[#FF6B00] shadow-[0_0_12px_#FF6B00]' : 'bg-white/40'
                  }`}
                />
              </div>

              <p className="text-xs font-mono text-zinc-500 mt-4">
                Free with verified college email • Zero platform fees, no spam
              </p>
            </form>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-10"
        >
          <Magnetic strength={0.18} className="w-full sm:w-auto">
            <InteractiveHoverButton
              text="Get started free"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-52 h-12 text-sm border-white/20 hover:border-[#FF6B00]/70 shadow-lg shadow-[#FF6B00]/20"
            />
          </Magnetic>

          <Magnetic strength={0.18} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/explore')}
              className="btn-zephyr-secondary w-full sm:w-auto px-7 py-3.5 text-sm"
            >
              Browse All Cohorts
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Luminous Orange Horizon Light Beam */}
      <OrangeHorizonLight
        className="bottom-0"
        intensity="high"
        height="h-[240px]"
        lineOpacity="opacity-100"
      />
    </section>
  );
}

export default FinalCTA;
