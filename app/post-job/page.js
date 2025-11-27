'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostJob() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleNext = () => {
    // In a real app, we'd validate and move to next step or submit
    if (step < 6) {
        setStep(step + 1);
    } else {
        // Submit
        router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
        setStep(step - 1);
    } else {
        router.back();
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200/10">
        <Link href="/dashboard">
            <button className="text-slate-400 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-500/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">close</span>
            </button>
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Post a Job
        </h2>
        <div className="w-10 h-10"></div> {/* Spacer */}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Page Indicators */}
        <div className="flex w-full flex-row items-center justify-center gap-3 py-5 px-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i <= step ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            ></div>
          ))}
        </div>

        <div className="px-4 py-3 flex-1">
            {step === 1 && (
                <>
                    {/* Headline Text */}
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-2 pt-2">
                        Job Title & Category
                    </h1>
                    {/* Body Text */}
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pb-6">
                        Start with a clear title that describes the project, then select a
                        category so the right freelancers can find it.
                    </p>
                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* Job Title TextField */}
                        <label className="flex flex-col w-full">
                        <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                            Job Title
                        </p>
                        <input
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                            placeholder="e.g., Senior UX/UI Designer"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        </label>
                        {/* Category Selector */}
                        <label className="flex flex-col w-full">
                        <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                            Category
                        </p>
                        <div className="relative">
                            <select
                                className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pl-4 pr-10 text-base font-normal leading-normal"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            <option value="">Select a category</option>
                            <option value="design">Design & Creative</option>
                            <option value="development">Development & IT</option>
                            <option value="writing">Writing & Translation</option>
                            <option value="marketing">Sales & Marketing</option>
                            <option value="admin">Admin & Customer Support</option>
                            </select>
                            <span className="material-symbols-outlined text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            expand_more
                            </span>
                        </div>
                        </label>
                    </div>
                </>
            )}
            {step > 1 && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500 dark:text-slate-400">Step {step} content placeholder</p>
                </div>
            )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 bg-background-light dark:bg-background-dark p-4 border-t border-slate-200/10">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center justify-center h-14 px-8 font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 rounded-xl w-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center h-14 px-8 font-bold text-white bg-primary rounded-xl w-full hover:bg-primary/90 transition-colors"
          >
            {step === 6 ? 'Post Job' : 'Next'}
          </button>
        </div>
      </footer>
    </div>
  );
}
