import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { GrailHoverChars } from './AnimatedText';
import { BrandLogo } from './BrandLogo';
import { Modal } from './Modal';
import { useAppStore } from '../store/useAppStore';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null); // 'privacy' | 'terms' | null
  const joinWaitlist = useAppStore((state) => state.joinWaitlist);
  const addToast = useAppStore((state) => state.addToast);

  const scrollToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      addToast('Please enter a valid college email address', 'error');
      return;
    }
    joinWaitlist(trimmed);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <footer className="bg-[#F5F5F7] text-[#424242] pt-16 sm:pt-20 pb-24 md:pb-14 border-t border-black/[0.08] select-none">
        <div className="container-custom">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 sm:pb-14 border-b border-black/[0.08]">
            {/* Column 1: Brand */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="inline-flex group">
                <BrandLogo size="lg" />
              </Link>
              <p className="font-body text-[#6E6E73] text-sm max-w-xs leading-relaxed">
                Peer-led cohorts in tech, design, music, and sports — taught exclusively by verified campus seniors.
              </p>
              <div className="flex items-center gap-2 font-mono text-xs text-[#424242] bg-white border border-black/[0.08] px-3 py-1.5 rounded-full w-fit shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0859D4]" />
                <span>College-verified network</span>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
                Explore
              </h4>
              <ul className="space-y-2 text-sm font-heading text-[#424242]">
                <li>
                  <Link to="/explore?category=tech" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Tech & Coding" />
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=art" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Design & 3D" />
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=music" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Music & Vocals" />
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=sports" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Sports & Fitness" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
                Platform
              </h4>
              <ul className="space-y-2 text-sm font-heading text-[#424242]">
                <li>
                  <Link to="/how-it-works" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="How it Works" />
                  </Link>
                </li>
                <li>
                  <Link to="/mentors" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Senior Mentors" />
                  </Link>
                </li>
                <li>
                  <Link to="/guilds" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Campus Guilds" />
                  </Link>
                </li>
                <li>
                  <Link to="/outcomes" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Outcomes" />
                  </Link>
                </li>
                <li>
                  <Link to="/teach" className="hover:text-[#0859D4] transition-colors inline-flex items-center min-h-[36px]">
                    <GrailHoverChars text="Become a Mentor" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
                Campus Updates
              </h4>
              <p className="text-xs text-[#6E6E73] mb-3">
                Get notified when cohorts from your college go live.
              </p>
              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <p className="text-xs text-emerald-700 font-semibold font-mono">
                    ✓ Subscribed successfully
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubscribed(false)}
                    className="text-[11px] font-medium text-[#0859D4] hover:underline cursor-pointer"
                  >
                    Add another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <input
                    type="email"
                    name="newsletterEmail"
                    id="footer-newsletter-email"
                    aria-label="Campus newsletter email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@college.ac.in"
                    className="w-full px-3.5 min-h-[42px] text-xs rounded-full bg-white border border-black/10 text-[#1D1D1F] placeholder-[#6E6E73] focus:outline-none focus:border-[#0859D4] font-mono"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="w-full btn-zephyr-primary text-xs min-h-[42px] cursor-pointer"
                  >
                    Join Waitlist
                  </motion.button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6E73] gap-4 font-mono">
            <p>© {new Date().getFullYear()} Campus Learn • Real Craft Happens Together</p>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setLegalDoc('privacy')}
                className="hover:text-[#1D1D1F] transition-colors cursor-pointer py-1.5"
              >
                <GrailHoverChars text="Privacy" />
              </button>
              <button
                type="button"
                onClick={() => setLegalDoc('terms')}
                className="hover:text-[#1D1D1F] transition-colors cursor-pointer py-1.5"
              >
                <GrailHoverChars text="Terms" />
              </button>
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={scrollToTop}
                className="hover:text-[#0859D4] text-[#1D1D1F] transition-colors flex items-center gap-1.5 cursor-pointer font-bold py-1.5"
              >
                <GrailHoverChars text="Back to top" />
                <ArrowUp className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={Boolean(legalDoc)}
        onClose={() => setLegalDoc(null)}
        title={legalDoc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        maxWidth="max-w-lg"
      >
        {legalDoc === 'privacy' ? (
          <div className="space-y-3 text-xs sm:text-sm text-[#424242] leading-relaxed">
            <p>
              <strong className="text-[#1D1D1F]">Campus Verification:</strong> Student email verification (<code>.edu</code> / <code>.ac.in</code>) confirms collegiate eligibility and is stored locally on your device in this preview workspace.
            </p>
            <p>
              <strong className="text-[#1D1D1F]">Local Data Separation:</strong> Sample demo records and personal signed-in enrollments, bookmarked cohorts, and 1:1 bookings are kept strictly separate in browser storage and never transmitted to third parties.
            </p>
            <p>
              <strong className="text-[#1D1D1F]">Your Control:</strong> You can log out or restore the default demo workspace at any time from your Student Dashboard.
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-xs sm:text-sm text-[#424242] leading-relaxed">
            <p>
              <strong className="text-[#1D1D1F]">Peer Learning Code:</strong> All cohorts on Campus Learn are peer-led educational exchanges free of commercial fees for verified students.
            </p>
            <p>
              <strong className="text-[#1D1D1F]">Academic Integrity:</strong> Mentors provide walkthroughs, architecture reviews, and skill drills—participants agree to uphold their institution&apos;s honor code.
            </p>
            <p>
              <strong className="text-[#1D1D1F]">Respectful Sessions:</strong> Confirmed 1:1 office hours should be attended on time or cancelled in advance through your Dashboard.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Footer;
