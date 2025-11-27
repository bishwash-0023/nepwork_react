'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { jobController } from '@/app/controllers/JobController';

export default function JobDetails({ params }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
      coverLetter: '',
      bidAmount: ''
  });

  // Unwrap params using React.use() or await if necessary in Next.js 15+, 
  // but for standard client component usage we can often access it directly or via props.
  // However, since this is a client component, we might need to await params if it's a promise in newer Next.js versions.
  // For safety in this environment, let's assume params is passed as a prop.
  
  useEffect(() => {
    const fetchJob = async () => {
        // In Next.js 15, params might be a promise. Let's handle it safely.
        const resolvedParams = await params; 
        const id = resolvedParams.id;
        if (id) {
            const data = await jobController.getJob(id);
            setJob(data);
        }
        setLoading(false);
    };
    fetchJob();
  }, [params]);

  const handleApply = async (e) => {
      e.preventDefault();
      setApplying(true);
      try {
          await jobController.applyForJob(job.id, applicationData);
          alert('Application submitted successfully!');
          setShowApplyModal(false);
          // Optionally refresh job data or redirect
          router.push('/jobs');
      } catch (error) {
          alert('Failed to apply');
      } finally {
          setApplying(false);
      }
  };

  if (loading) return (
      <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
      </DashboardLayout>
  );

  if (!job) return (
      <DashboardLayout>
          <div className="flex flex-col items-center justify-center min-h-screen">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job not found</h2>
              <Link href="/jobs" className="text-primary hover:underline mt-4">Back to Jobs</Link>
          </div>
      </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
            <Link href="/jobs" className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
                <span className="material-symbols-outlined mr-2">arrow_back</span>
                Back to Search
            </Link>

            <div className="bg-white dark:bg-[#192430] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">business</span>
                                    {job.company}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">location_on</span>
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                    Posted {job.postedTime}
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowApplyModal(true)}
                            className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {job.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requirements</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                {job.requirements?.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills Required</h2>
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Job Overview</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">
                                        ${job.budget} <span className="text-sm font-normal text-gray-500">({job.budgetType})</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Job Type</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{job.type}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Proposals</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{job.proposals} Received</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">About the Client</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                                    {job.company.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{job.company}</p>
                                    <p className="text-sm text-gray-500">Member since 2023</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500 text-lg">verified</span>
                                    Payment Verified
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-500 text-lg">star</span>
                                    4.9/5 Rating
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Apply Modal */}
        {showApplyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white dark:bg-[#192430] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Apply for this Job</h3>
                        <button onClick={() => setShowApplyModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <form onSubmit={handleApply} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bid Amount ($)</label>
                            <input 
                                type="number" 
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                                value={applicationData.bidAmount}
                                onChange={e => setApplicationData({...applicationData, bidAmount: e.target.value})}
                                placeholder={job.budget.toString()}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Letter</label>
                            <textarea 
                                required
                                rows="6"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                                value={applicationData.coverLetter}
                                onChange={e => setApplicationData({...applicationData, coverLetter: e.target.value})}
                                placeholder="Explain why you are the best fit for this job..."
                            ></textarea>
                        </div>
                        <div className="pt-2 flex gap-3 justify-end">
                            <button 
                                type="button"
                                onClick={() => setShowApplyModal(false)}
                                className="px-6 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={applying}
                                className="px-6 py-2 rounded-lg font-bold text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {applying ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
}
