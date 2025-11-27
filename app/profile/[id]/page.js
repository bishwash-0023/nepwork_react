'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { userController } from '@/app/controllers/UserController';
import Link from 'next/link';

export default function ProfilePage({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        if (id) {
            const userData = await userController.getUser(id);
            setUser(userData);
        }
        setLoading(false);
    };
    fetchUser();
  }, [params]);

  if (loading) return (
      <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
      </DashboardLayout>
  );

  if (!user) return (
      <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
              <p>User not found</p>
          </div>
      </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white dark:bg-[#192430] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10"></div>
                <div className="relative flex flex-col md:flex-row items-start gap-6 pt-10">
                    <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-[#192430] shadow-lg object-cover"
                    />
                    <div className="flex-1 mt-2">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">{user.title}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-lg">location_on</span>
                                        {user.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                                        Joined {user.joined}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    Hire Me
                                </button>
                                <button className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                    {/* About */}
                    <div className="bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {user.bio}
                        </p>
                    </div>

                    {/* Reviews */}
                    <div className="bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Reviews ({user.reviews})</h2>
                        <div className="space-y-4">
                            {/* Dummy Review 1 */}
                            <div className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white">Great work!</h4>
                                    <div className="flex text-yellow-500 text-sm">
                                        {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    "Delivered the project on time and exceeded expectations. Highly recommended."
                                </p>
                                <p className="text-xs text-gray-400 mt-2">2 weeks ago</p>
                            </div>
                             {/* Dummy Review 2 */}
                             <div className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white">Very professional</h4>
                                    <div className="flex text-yellow-500 text-sm">
                                        {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    "Excellent communication and skills. Will hire again."
                                </p>
                                <p className="text-xs text-gray-400 mt-2">1 month ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400">Rating</span>
                                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                                    <span className="material-symbols-outlined text-yellow-500 text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                    {user.rating}
                                </span>
                            </div>
                            {user.hourlyRate && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-gray-400">Hourly Rate</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{user.hourlyRate}</span>
                                </div>
                            )}
                            {user.jobsCompleted && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-gray-400">Jobs Completed</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{user.jobsCompleted}</span>
                                </div>
                            )}
                             {user.totalSpent && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-gray-400">Total Spent</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{user.totalSpent}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
