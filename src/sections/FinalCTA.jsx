import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { OrangeHorizonLight } from '../components/OrangeHorizonLight';
import { SplitTextReveal } from '../components/AnimatedText';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

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
      text: isMash ? "nice try. that's just mashing." : 'keep going...',
    };
  }
  const [local, domain] = val.split('@');
  if (!local) return { mode: 'text', text: 'nothing before the @?' };
  if (!domain) return { mode: 'text', text: '@ which campus?' };
  if (val.includes('..')) return { mode: 'text', text: 'one dot at a time.' };
  if (!/\.[a-z]{2,}$/i.test(domain)) {
    return { mode: 'text', text: 'almost. add .in or .com' };
  }
  if (EMAIL_RE.test(val)) {
    return { mode: 'enter' };
  }
  return { mode: 'text', text: 'not quite an email.' };
}

const PLACEHOLDER_TEXT = 'Your College Email';

export function FinalCTA() {
  const tileRef = useRef(null);
  const sectionRef = useRef(null);

  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState('idle');
  const [bubble, setBubble] = useState({ mode: 'hidden' });
  const [inView, setInView] = useState(false);

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
      className="py-20 sm:py-24 relative overflow-hidden text-center bg-white border-t border-black/[0.06]"
    >
      <div
        aria-hidden="true"
        style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
        }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(circle,rgba(8,89,212,0.09)_0%,rgba(26,89,249,0.03)_45%,transparent_72%)] blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Cursor-Lit 3D Emblem Tile */}
        <div className="flex justify-center mb-6">
          <motion.div
            ref={tileRef}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                'radial-gradient(120% 120% at var(--lx, 45%) var(--ly, 32%), #70B5FF 0%, #1A59F9 52%, #0859D4 100%)',
            }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-[24px] flex items-center justify-center shadow-[0_20px_50px_rgba(8,89,212,0.28),inset_0_1px_2px_rgba(255,255,255,0.65)] select-none"
          >
            <svg viewBox="0 0 48 48" className="w-12 h-12 fill-none">
              <circle cx="24" cy="24" r="17" stroke="#FFFFFF" strokeWidth="3.2" />
              <line
                x1="12"
                y1="36"
                x2="36"
                y2="12"
                stroke="#FFFFFF"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#1D1D1F] tracking-tight leading-[1.06] mb-3 max-w-2xl mx-auto">
          <SplitTextReveal text="Join your" />{' '}
          <span className="font-editorial italic font-normal text-[#0859D4] text-[1.1em]">
            campus.
          </span>
        </h2>

        <p className="text-[#6E6E73] text-sm mb-10 max-w-sm mx-auto">
          Get instant alerts when new cohorts open.
        </p>

        {/* Minimalist Modern Pill Email Input */}
        <div className="max-w-xl mx-auto my-6 px-2 sm:px-4">
          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.08] inline-flex items-center gap-4"
            >
              <span className="w-8 h-8 rounded-full bg-[#0859D4] text-white flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <div className="text-left">
                <p className="font-heading font-bold text-sm text-[#1D1D1F]">
                  You&apos;re on the campus list
                </p>
                <p className="text-xs text-[#6E6E73]">
                  We&apos;ll notify {email} when new cohorts open.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('');
                  setStatus('idle');
                }}
                className="px-3 py-1.5 rounded-full bg-white border border-black/10 hover:border-black/25 text-xs font-medium text-[#1D1D1F] transition-colors cursor-pointer"
              >
                Reset
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="relative flex flex-col items-center">
              <div className="relative w-full">
                {bubble.mode !== 'hidden' && bubble.mode !== 'enter' && (
                  <div className="grail-bubble-float absolute -top-11 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="px-3.5 py-1 rounded-full text-xs font-mono font-medium text-white bg-[#1D1D1F] shadow-md whitespace-nowrap">
                      {bubble.text}
                    </div>
                  </div>
                )}

                <div
                  className={`flex items-center gap-2 p-1.5 pl-4 sm:pl-5 rounded-full bg-white border transition-all duration-300 ${
                    focused
                      ? 'border-[#0859D4] shadow-[0_12px_36px_rgba(8,89,212,0.14)] ring-4 ring-[#0859D4]/[0.08]'
                      : 'border-black/[0.12] shadow-[0_10px_30px_rgba(29,29,31,0.06)] hover:border-black/25'
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      focused ? 'text-[#0859D4]' : 'text-[#6E6E73]'
                    }`}
                  >
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>

                  <input
                    type="email"
                    required
                    aria-label="Your college email"
                    placeholder="Enter your college email (e.g. you@iitb.ac.in)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => setFocused(e.target.value.length > 0)}
                    className="w-full font-body text-xs sm:text-sm text-[#1D1D1F] placeholder:text-[#6E6E73]/80 bg-transparent border-0 outline-none py-2 focus:ring-0"
                  />

                  <button
                    type="submit"
                    className="shrink-0 px-4 sm:px-5 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm text-white bg-[#1D1D1F] hover:bg-[#0859D4] transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Join Campus</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-[#6E6E73]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Verified college network (.edu / .ac.in) • Zero spam</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <OrangeHorizonLight
        className="bottom-0"
        intensity="high"
        height="h-[200px]"
        lineOpacity="opacity-90"
      />
    </section>
  );
}

export default FinalCTA;
