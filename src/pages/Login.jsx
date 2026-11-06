import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, GraduationCap, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  // Validate college email domain
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
      setError('Please use a valid college email ending with .edu or .ac.in');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      login({
        email,
        name: email.split('@')[0].replace('.', ' '),
        college: email.endsWith('.ac.in') ? 'Indian Institute of Technology' : 'University College',
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    }, 800);
  };

  const handleDemoLogin = () => {
    setEmail('aarav.sharma@iitb.ac.in');
    setPassword('student123');
  };

  return (
    <div className="min-h-screen pt-20 flex relative overflow-hidden">
      {/* Decorative ambient radial background */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-2xl border border-border/80 dark:border-border-dark/80 shadow-lift">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Campus Sign In</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl text-text dark:text-text-dark">
              Welcome back
            </h1>
            <p className="text-sm text-muted dark:text-muted-dark mt-2">
              Log in to continue learning and connect with peer mentors.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-md text-xs text-rose-400 flex items-center gap-2">
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
                Logged in successfully!
              </h3>
              <p className="text-xs text-emerald-400/90">
                Redirecting to your student dashboard...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* College Email */}
              <div>
                <label className="block text-xs font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-1.5">
                  College Email (.edu or .ac.in)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu or name@iitb.ac.in"
                  className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500 transition-colors"
                />
                {isEmailDirty && !isEmailValid && (
                  <p className="text-[11px] text-amber-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Must be a college email ending with .edu or .ac.in
                  </p>
                )}
                {isEmailDirty && isEmailValid && (
                  <p className="text-[11px] text-emerald-500 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Valid campus domain detected
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-text dark:text-text-dark uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#reset" className="text-xs text-orange-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500 pr-10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                type="submit"
                loading={isLoading}
              >
                Log In
              </Button>

              {/* Quick Demo Fill */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full text-center text-xs text-orange-400 hover:text-orange-300 hover:underline font-medium py-1 cursor-pointer"
              >
                Auto-fill demo student credentials
              </button>

              <div className="text-center text-xs text-muted dark:text-muted-dark pt-2">
                Don't have a Campus Learn account yet?{' '}
                <Link to="/signup" className="font-semibold text-orange-400 hover:underline">
                  Sign up here
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
            "Everything I know about web dev and hackathons was passed down by a campus senior."
          </h2>
          <div>
            <p className="font-bold text-base">Rohan Deshmukh</p>
            <p className="text-xs text-white/70">4th year CSE • IIT Bombay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
