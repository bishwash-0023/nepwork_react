'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { jobController } from '@/app/controllers/JobController';

export default function JobProposals({ params }) {
  const [job, setJob] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposals, setSelectedProposals] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const resolvedParams = await params;
        const jobId = resolvedParams.id;
        if (jobId) {
            const [jobData, proposalsData] = await Promise.all([
                jobController.getJob(jobId),
                jobController.getProposals(jobId)
            ]);
            setJob(jobData);
            setProposals(proposalsData);
        }
        setLoading(false);
    };
    fetchData();
  }, [params]);

  const toggleSelection = (id) => {
      if (selectedProposals.includes(id)) {
          setSelectedProposals(selectedProposals.filter(pid => pid !== id));
      } else {
          if (selectedProposals.length < 3) {
              setSelectedProposals([...selectedProposals, id]);
          } else {
              alert("You can compare up to 3 proposals at a time.");
          }
      }
  };

  if (loading) return (
      <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
      </DashboardLayout>
  );

  if (!job) return <div>Job not found</div>;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8 pb-32">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <Link href="/my-jobs" className="flex items-center text-gray-500 hover:text-primary mb-2 transition-colors">
                        <span className="material-symbols-outlined mr-1 text-sm">arrow_back</span>
                        Back to My Jobs
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Proposals for {job.title}
                    </h1>
                </div>
                {selectedProposals.length > 1 && (
                    <button 
                        onClick={() => setShowComparison(!showComparison)}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">compare_arrows</span>
                        {showComparison ? 'Hide Comparison' : `Compare (${selectedProposals.length})`}
                    </button>
                )}
            </div>

            {/* Comparison View */}
            {showComparison && selectedProposals.length > 0 && (
                <div className="mb-8 overflow-x-auto pb-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex gap-4 min-w-max">
                        {selectedProposals.map(id => {
                            const p = proposals.find(prop => prop.id === id);
                            return (
                                <div key={id} className="w-80 bg-white dark:bg-[#192430] rounded-xl border-2 border-primary p-6 shadow-lg relative">
                                    <button 
                                        onClick={() => toggleSelection(id)}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                    <div className="flex flex-col items-center text-center mb-4">
                                        <img src={p.freelancerAvatar} className="w-20 h-20 rounded-full mb-3 object-cover border-4 border-gray-100 dark:border-gray-700" alt={p.freelancerName} />
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{p.freelancerName}</h3>
                                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                                            <span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                            {p.rating} ({p.reviews})
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                            <span className="text-gray-500">Bid Amount</span>
                                            <span className="font-bold text-gray-900 dark:text-white">${p.bidAmount}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                            <span className="text-gray-500">Skills Match</span>
                                            <span className="font-bold text-green-500">95%</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block mb-1">Top Skills</span>
                                            <div className="flex flex-wrap gap-1">
                                                {p.skills?.map(skill => (
                                                    <span key={skill} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-300">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90">
                                        Hire Now
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Proposals List */}
            <div className="grid gap-4">
                {proposals.map((proposal) => (
                    <div 
                        key={proposal.id} 
                        className={`bg-white dark:bg-[#192430] rounded-xl border p-6 transition-all ${
                            selectedProposals.includes(proposal.id) 
                            ? 'border-primary ring-1 ring-primary shadow-md' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex items-start gap-4 min-w-[200px]">
                                <div className="relative">
                                    <img src={proposal.freelancerAvatar} className="w-16 h-16 rounded-full object-cover" alt={proposal.freelancerName} />
                                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#192430] rounded-full p-0.5">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedProposals.includes(proposal.id)}
                                            onChange={() => toggleSelection(proposal.id)}
                                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{proposal.freelancerName}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Full Stack Developer</p>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium mt-1">
                                        <span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                        {proposal.rating}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white">Cover Letter</h4>
                                    <span className="font-bold text-xl text-gray-900 dark:text-white">${proposal.bidAmount}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {proposal.coverLetter}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {proposal.skills?.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 justify-center min-w-[140px]">
                                <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                                    Hire
                                </button>
                                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
