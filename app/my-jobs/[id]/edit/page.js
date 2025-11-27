'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { jobController } from '@/app/controllers/JobController';

export default function EditJob({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    requirements: '',
    budget: '',
    budgetType: 'Fixed Price',
    type: 'Full-time',
    tags: ''
  });

  useEffect(() => {
      const fetchJob = async () => {
          const resolvedParams = await params;
          const id = resolvedParams.id;
          if (id) {
              const job = await jobController.getJob(id);
              if (job) {
                  setFormData({
                      ...job,
                      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements,
                      tags: Array.isArray(job.tags) ? job.tags.join(', ') : job.tags
                  });
              }
          }
          setLoading(false);
      };
      fetchJob();
  }, [params]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
        // In a real app, we'd call updateJob here
        // await jobController.updateJob(params.id, formData);
        // For now, just simulate success
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/my-jobs');
    } catch (error) {
        alert('Failed to update job');
    } finally {
        setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200/10">
        <Link href="/my-jobs">
            <button className="text-slate-400 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-500/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">close</span>
            </button>
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Edit Job
        </h2>
        <div className="w-10 h-10"></div>
      </div>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
            <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Job Title</p>
                <input
                    name="title"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                    value={formData.title}
                    onChange={handleChange}
                />
            </label>

            <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Category</p>
                <div className="relative">
                    <select
                        name="category"
                        className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pl-4 pr-10 text-base font-normal leading-normal"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Development">Development & IT</option>
                        <option value="Design">Design & Creative</option>
                        <option value="Writing">Writing & Translation</option>
                        <option value="Marketing">Sales & Marketing</option>
                        <option value="Admin">Admin & Customer Support</option>
                    </select>
                    <span className="material-symbols-outlined text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                </div>
            </label>

            <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Description</p>
                <textarea
                    name="description"
                    rows="6"
                    className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary p-[15px] text-base font-normal leading-normal"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>

            <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col w-full">
                    <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Budget ($)</p>
                    <input
                        name="budget"
                        type="number"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                        value={formData.budget}
                        onChange={handleChange}
                    />
                </label>
                <label className="flex flex-col w-full">
                    <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Budget Type</p>
                    <select
                        name="budgetType"
                        className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pl-4 pr-10 text-base font-normal leading-normal"
                        value={formData.budgetType}
                        onChange={handleChange}
                    >
                        <option value="Fixed Price">Fixed Price</option>
                        <option value="Hourly">Hourly</option>
                    </select>
                </label>
            </div>

            <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center h-14 px-8 font-bold text-white bg-primary rounded-xl w-full hover:bg-primary/90 transition-colors disabled:opacity-50 mt-8"
            >
                {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
        </form>
      </main>
    </div>
  );
}
