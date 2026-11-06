import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, GraduationCap, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const isValidCollegeEmail = (str) => {
    const trimmed = (str || '').trim().toLowerCase();
    return trimmed.endsWith('.edu') || trimmed.endsWith('.ac.in') || trimmed.includes('@college.');
  };

  const isEmailDirty = email.length > 0;
  const isEmailValid = isValidCollegeEmail(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isEmailValid) {
      setError('A valid college email domain (.edu or .ac.in) is required to join Campus Learn.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      login({
        name: fullName || 'Student Learner',
        email,
        college: collegeName || 'Indian Institute of Technology',
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-20 flex relative overflow-hidden">
      {/* Decorative ambient radial background */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6 glass-card p-8 rounded-2xl border border-border/80 dark:border-border-dark/80 shadow-lift">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Campus Registration</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-text dark:text-text-dark">
              Join Campus Learn
            </h1>
            <p className="text-xs sm:text-sm text-muted dark:text-muted-dark mt-1">
              Connect with fellow students and senior mentors across campuses.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-md text-xs text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" strokeWidth={2} />
              <h3 className="font-heading font-bold text-lg text-emerald-300">
                Account Created!
              </h3>
              <p className="text-xs text-emerald-400/90">
                Setting up your student dashboard...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="signup-fullname" className="block text-xs font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="signup-fullname"
                  name="fullName"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priyanshi Mehta"
                  className="w-full px-3 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                />
              </div>

              {/* College Name */}
              <div>
                <label htmlFor="signup-college" className="block text-xs font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-1">
                  College / University Name
                </label>
                <input
                  type="text"
                  id="signup-college"
                  name="collegeName"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. BITS Pilani, IIT Delhi, SRCC"
                  className="w-full px-3 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                />
              </div>

              {/* College Email */}
              <div>
                <label htmlFor="signup-email" className="block text-xs font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-1">
                  College Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu or name@college.ac.in"
                  className="w-full px-3 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                />
                {isEmailDirty && !isEmailValid && (
                  <p className="text-[11px] text-amber-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Must look like name@college.edu or name@college.ac.in
                  </p>
                )}
                {isEmailDirty && isEmailValid && (
                  <p className="text-[11px] text-emerald-500 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    College domain verified
                  </p>
                )}
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-password" className="block text-xs font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="signup-password"
                      name="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-confirm-password" className="block text-xs font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-confirm-password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                type="submit"
                loading={isLoading}
              >
                Create Student Account
              </Button>

              <div className="text-center text-xs text-muted dark:text-muted-dark pt-1">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-orange-400 hover:underline">
                  Log in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Column: Gradient Art (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 cta-gradient p-12 items-center justify-center relative overflow-hidden text-white">
        <div className="max-w-md space-y-6 z-10">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">
            "We built this because collegiate fests, hackathons, and interviews are won by shared knowledge."
          </h2>
          <div>
            <p className="font-bold text-base">Campus Learn Student Council</p>
            <p className="text-xs text-white/70">Pan-India Collegiate Network</p>
          </div>
        </div>
      </div>
    </div>
  );
}
