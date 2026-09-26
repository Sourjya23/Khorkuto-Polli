'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Trigger a storage event manually if we want other tabs/components to know, 
      // but just pushing is fine.
      window.dispatchEvent(new Event('storage'));
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-modal border border-ink-muted/10">
        
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-ink mb-2">Welcome Back</h1>
          <p className="text-ink-soft">Please enter your details to sign in.</p>
        </div>

        {error && (
          <div className="bg-error/10 text-error p-4 rounded-xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base font-semibold text-ink">Email Address <span className="text-error">*</span></label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g., ssjewel99@gmail.com"
              className="w-full bg-paper-dark border-none rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-terracotta outline-none transition-shadow"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-end">
              <label htmlFor="password" className="text-base font-semibold text-ink">Password <span className="text-error">*</span></label>
              <Link href="/forgot-password" className="text-sm font-medium text-terracotta hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
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
            {isLoading ? 'Signing in...' : 'Log In'}
          </button>

        </form>

        <div className="mt-8 text-center text-ink-soft text-base">
          Don't have an account? <Link href="/register" className="font-bold text-ink hover:text-terracotta underline decoration-2 underline-offset-4">Create Account</Link>
        </div>
        
      </div>
    </div>
  );
}
