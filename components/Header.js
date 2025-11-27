'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${scrolled ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg shadow-md' : 'bg-transparent dark:bg-transparent'}`}>
      <div className="flex items-center p-4">
        <h2 className={`text-xl font-bold leading-tight tracking-[-0.015em] flex-1 ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>WorkHub</h2>
        
        <nav className="flex items-center gap-4">
            <Link href="/post-job" className="text-white text-sm font-semibold leading-normal shrink-0 bg-white/10 dark:bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
            Post a Job
            </Link>
            <Link href="/login" className={`text-sm font-semibold leading-normal shrink-0 hover:opacity-80 transition-colors ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            Log In
            </Link>
            <Link href="/signup" className={`text-sm font-semibold leading-normal shrink-0 hover:opacity-80 transition-colors ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            Sign Up
            </Link>
        </nav>
      </div>
    </header>
  );
}
