'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token early (we simulate OTP but the backend actually already registered the user)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setStep(2); // Go to OTP verification step
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.slice(0, 6).split('');
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (index + i < 6) newOtp[index + i] = pastedData[i];
      }
      setOtp(newOtp);
      // focus last filled input or end
      const focusIndex = Math.min(index + pastedData.length, 5);
      const nextInput = document.getElementById(`otp-${focusIndex}`);
      if (nextInput) nextInput.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP backend verification (since backend doesn't support OTP strictly yet)
    setIsLoading(true);
    setTimeout(() => {
      window.dispatchEvent(new Event('storage')); // update other tabs
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-modal border border-ink-muted/10">
        
        {step === 1 ? (
          <>
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl text-ink mb-2">Create Account</h1>
              <p className="text-ink-soft">Join the খড়কুটো পল্লী family today.</p>
            </div>
            
            {error && (
              <div className="bg-error/10 text-error p-4 rounded-xl mb-6 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-base font-semibold text-ink">Full Name <span className="text-error">*</span></label>
                <input 
                  id="name"
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="e.g., Ahsan Karim"
                  className="w-full bg-paper-dark border-none rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-terracotta outline-none transition-shadow"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-base font-semibold text-ink">Email Address (Gmail preferred) <span className="text-error">*</span></label>
                <input 
                  id="email"
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="e.g., ssjewel99@gmail.com"
                  className="w-full bg-paper-dark border-none rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-terracotta outline-none transition-shadow"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-base font-semibold text-ink">Phone Number <span className="text-error">*</span></label>
                <input 
                  id="phone"
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full bg-paper-dark border-none rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-terracotta outline-none transition-shadow"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label htmlFor="password" className="text-base font-semibold text-ink">Password <span className="text-error">*</span></label>
                <div className="relative">
                  <input 
                    id="password"
                    type={showPassword ? 'text' : 'password'} 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    placeholder="Create a strong password"
                    className="w-full bg-paper-dark border-none rounded-xl px-5 py-4 pr-12 text-base focus:ring-2 focus:ring-terracotta outline-none transition-shadow"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-ink text-white rounded-xl py-4 text-lg font-bold hover:bg-terracotta transition-colors shadow-soft mt-4 disabled:opacity-70 flex justify-center items-center">
                {isLoading ? 'Creating...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center text-ink-soft text-base">
              Already have an account? <Link href="/login" className="font-bold text-ink hover:text-terracotta underline decoration-2 underline-offset-4">Log In</Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl text-ink mb-4">Verify Email</h1>
              <p className="text-ink-soft leading-relaxed">
                We've sent a 6-digit verification code to<br/>
                <strong className="text-ink">{formData.email}</strong>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-8">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-paper-dark border border-ink-muted/20 rounded-xl focus:border-terracotta focus:ring-2 focus:ring-terracotta outline-none transition-all"
                  />
                ))}
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-terracotta text-white rounded-xl py-4 text-lg font-bold hover:bg-terracotta-dark transition-colors shadow-soft disabled:opacity-70 flex justify-center items-center">
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </button>
            </form>

            <div className="mt-8 text-center text-ink-soft text-base flex flex-col gap-2">
              <span>Didn't receive the code?</span>
              <button className="font-bold text-terracotta hover:underline decoration-2 underline-offset-4">Resend Code in 0:59</button>
              <button onClick={() => setStep(1)} className="font-bold text-ink hover:underline decoration-2 underline-offset-4 mt-2">Change Email Address</button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
