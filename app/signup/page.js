'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';
import { authController } from '@/app/controllers/AuthController';

export default function Signup() {
  const router = useRouter();
  const [role, setRole] = useState('work');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authController.signup({ email, password, role });
      router.push('/onboarding'); // Redirect to onboarding
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image="https://lh3.googleusercontent.com/aida-public/AB6AXuBfz8p8eP5iZ39YMJJpi1Q6qIciYkSvTfIS1CJjzEfFF6R2ZxZTRdLRtzyTYcOhqQK_yAPJyIrtkNBPV66MFA9riLk4f4IPYd6-U705D-LYc2Bc7KiqIJMv42L9f5m14plVZvWFokYIMqObO0q4JsA4QU_-6X7bh2tJauWJWL4Npst9xELgCJPzZqnrOF6NiMEP2_PQWMnYvCTjxElEIY0rd2mHZl-waKX7LQeIFsH6AcX-eIr8Bmn59NVC1761qH5nOP1597ATyiVl"
      quote="This platform transformed my freelance career. The quality of clients is unmatched."
      quoteAuthor="Alex Johnson, Senior Developer"
    >
      <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pt-8 pb-3">
        Your Next Opportunity Awaits
      </h1>
      
      <div className="flex py-3">
        <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
          <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors ${role === 'hire' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
            <span className="truncate">I want to Hire</span>
            <input
              className="invisible w-0"
              name="role_selection"
              type="radio"
              value="hire"
              checked={role === 'hire'}
              onChange={() => setRole('hire')}
            />
          </label>
          <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors ${role === 'work' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
            <span className="truncate">I want to Work</span>
            <input
              className="invisible w-0"
              name="role_selection"
              type="radio"
              value="work"
              checked={role === 'work'}
              onChange={() => setRole('work')}
            />
          </label>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-3 pt-4">
        Sign up with:
      </p>
      
      <div className="flex flex-col gap-3 py-3">
         {/* Social Buttons (Dummy) */}
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-lg h-12 px-5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-base font-bold leading-normal tracking-[0.015em] w-full transition-colors hover:bg-slate-300 dark:hover:bg-slate-700">
             <svg className="h-5 w-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path><path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path><path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path><path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,36.213,44,30.571,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path></svg>
          <span className="truncate">Continue with Google</span>
        </button>
      </div>

      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
        <span className="mx-4 flex-shrink text-sm text-slate-500 dark:text-slate-400">
          Or continue with email
        </span>
        <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border-0 bg-white/5 dark:bg-white/5 py-2.5 px-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border-0 bg-white/5 dark:bg-white/5 py-2.5 px-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold leading-6 text-primary hover:text-primary/90">
          Sign In
        </Link>
      </p>
       <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            By signing up, you agree to our{' '}
            <Link href="#" className="font-medium underline hover:text-primary">Terms of Service</Link> and{' '}
            <Link href="#" className="font-medium underline hover:text-primary">Privacy Policy</Link>.
        </p>
    </AuthLayout>
  );
}
