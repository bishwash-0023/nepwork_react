'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { jobController } from '@/app/controllers/JobController';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All',
    minBudget: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]); // Re-fetch when filters change (debouncing could be added for search)

  const fetchJobs = async () => {
    setLoading(true);
    const data = await jobController.getJobs(filters);
    setJobs(data);
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        {/* Search Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-[#192430] border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                <input 
                  type="text" 
                  placeholder="Search jobs by title, skill, or keyword..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
            
            {/* Quick Filters */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 no-scrollbar">
              <select 
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer focus:ring-2 focus:ring-primary/20"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Writing">Writing</option>
                <option value="Admin">Admin</option>
              </select>

              <select 
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer focus:ring-2 focus:ring-primary/20"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="All">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>

               <select 
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer focus:ring-2 focus:ring-primary/20"
                value={filters.minBudget}
                onChange={(e) => handleFilterChange('minBudget', e.target.value)}
              >
                <option value="">Any Budget</option>
                <option value="100">$100+</option>
                <option value="500">$500+</option>
                <option value="1000">$1000+</option>
                <option value="5000">$5000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {loading ? 'Searching...' : `${jobs.length} Jobs Found`}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Sort by: Newest</span>
          </div>

          {loading ? (
             <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700 h-40"></div>
                ))}
             </div>
          ) : jobs.length > 0 ? (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id} className="group block">
                  <div className="bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-md transition-all relative overflow-hidden">
                    {job.featured && (
                        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                            FEATURED
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                       <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                {job.title}
                             </h3>
                             <span className="text-xs text-gray-500 dark:text-gray-400">• {job.postedTime}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                             {job.budgetType} - <span className="text-gray-900 dark:text-white font-bold">${job.budget}</span> - {job.type}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                             {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                             {job.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
                                   {tag}
                                </span>
                             ))}
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-2 min-w-[120px]">
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                             <span className="material-symbols-outlined text-base">verified</span>
                             Payment Verified
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                             <span className="material-symbols-outlined text-base">location_on</span>
                             {job.location}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                             <span className="material-symbols-outlined text-base">description</span>
                             {job.proposals} Proposals
                          </div>
                       </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">No jobs found</h3>
               <p className="text-gray-500 dark:text-gray-400">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
