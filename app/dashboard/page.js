'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { authController } from '@/app/controllers/AuthController';
import { jobController } from '@/app/controllers/JobController';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user and data
    const fetchData = async () => {
      // In a real app, we'd check auth here. For now, just get dummy user.
      const currentUser = authController.getUser() || { name: 'Jane Doe', role: 'client' };
      setUser(currentUser);
      
      // Dummy active jobs (could be from JobController)
      setActiveJobs([
        {
          id: 1,
          title: 'UI/UX Design for Mobile App',
          freelancer: 'David Miller',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBecCzAzBEe41DuGoY03sthZ5A2jPjw8XN3_QFW6k2cTf14L8G7hzm5JLbLRzZI9U9y4KE2d_vZP89W5PQmVbONX8_thYUzzTDt0RoFSwli5wzn0BMeVVet2yfBmMHVrx_71vnMTeFh6lYEKm7kLBJDGkcDun8dFKEZucM1merHiASX-lQf599972CLQhRXsrEuJIOm7NkxBnBTJChYYyzfLxbrC6c9Oaodb0yI2HKUahd6s0N9QK5hG09qJLPxOfAEb5Jm2LOfZ-6w',
          status: 'In Review',
          statusColor: 'text-orange-500 bg-orange-500/20'
        },
        {
          id: 2,
          title: 'Backend API Development',
          freelancer: 'Sarah Chen',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh-aiNcCW5cqRtzstE3mQpmMhrw19H3dz-qO9bjqQM7WVWzUQvanGYDW8wCzm0W8-INMC3Ok5Olf91gEwOpiLfsqhHiJeBaAZamCr7_i4siDDvmJap_Wt0E6TGxF7bgaUwZozw2ONkc6Fil3e3TPVIpkdBjNRm6HVib4i0wF0VB20BubcXIWIOThphzFHrYtokWeOLXzufBikyKxHG2v-XJ8CXBQ33H63UdcgXH1LYYzawA8whQbkQi_QZ-gf979vkebTHvmGoHpMt',
          status: 'In Progress',
          statusColor: 'text-primary bg-primary/20'
        },
        {
          id: 3,
          title: 'Content Writing for Blog',
          freelancer: 'Michael Brown',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTsD7VPifNUR9klSEyzvfL7WnyM6L_BjOvZMbGwcdA6AOsJHSoJb7T0_oY7ltm09FbujZLxzUdNzW_GbCkuQtWO5o5hGExplfdK46BNFaCnmrlISQ7F5-84iA6_kGoe9tT-BW7CNgUEtmuF1JiZKzRHwIY2A-T3KHx-9qQlpqrDgU0m3Dnuf5kpSNnZBvYUsVVrVYZgVDyOGu1goqDXLjZnqYqe_pdbtshSHcR9Gi78k7iMWUfuS6713NJlzZGVj5RtQyTkDxHVIIf',
          status: 'Payment Pending',
          statusColor: 'text-green-500 bg-green-500/20'
        }
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <DashboardLayout user={user}>
      {/* Active Jobs Section */}
      <section className="py-4">
        <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
          Active Jobs
        </h2>
        <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pl-4 pr-1">
          <div className="flex items-stretch gap-3">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="flex h-full flex-col gap-3 rounded-xl bg-white dark:bg-[#192430] p-4 min-w-64 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-gray-900 dark:text-gray-100 text-base font-bold leading-normal">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6"
                    style={{ backgroundImage: `url("${job.avatar}")` }}
                  ></div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    {job.freelancer}
                  </p>
                </div>
                <div className="mt-1">
                  <span className={`text-xs font-bold py-1 px-2.5 rounded-full ${job.statusColor}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incoming Proposals Section */}
      <section className="pt-4">
        <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2">
          Incoming Proposals
        </h2>
        <div className="sticky top-[73px] z-[9] bg-background-light dark:bg-background-dark pb-3">
          <div className="flex border-b border-gray-200 dark:border-gray-700 px-4 gap-6">
            <a
              className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary pb-3 pt-2"
              href="#"
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Best Match
              </p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-gray-500 dark:text-gray-400 pb-3 pt-2"
              href="#"
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Newest
              </p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-gray-500 dark:text-gray-400 pb-3 pt-2"
              href="#"
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Archived
              </p>
            </a>
          </div>
        </div>

        {/* Proposal List */}
        <div className="flex flex-col gap-3 px-4 pt-2">
          {/* Proposal Card 1 */}
          <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#192430] p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDubadHrktlaVyNbShkeyHQqXnHNAG6fjt3OvBvr0RTUy-QkvMSSz-qlPYjUkC9w_84Tp3Gp9Vv8N1bNdgZjeX3ibq1iDG01SXVOUHhrXiGEg2J6Z-J_fSmU0wHueYsdBSKy2xau7Y7ZzmvPSGcSWkSkoSk6843PqeHLf3-WVmtAVB2uYgkNx3JwmZXczX2CZ_LGcjgVL0Z-Ex-a8s0izPyMDxyKUyxdJ0jvtD2efwfxbjqMF4eH-h0qY80nDPAwsLS62bgLX9e7cYp")',
                  }}
                ></div>
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-bold">
                    Elena Petrova
                  </p>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-base text-orange-400"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      4.9 (120 reviews)
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-900 dark:text-gray-100 text-lg font-bold">
                $1,250
              </p>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
              "With over 8 years of experience in mobile UI/UX, I can deliver a modern,
              intuitive design that aligns with your brand..."
            </p>
            <div className="flex gap-3">
              <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-4 hover:bg-primary/30 transition-colors">
                Message
              </button>
              <button className="flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-4 hover:bg-primary/90 transition-colors">
                View Proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* My Job Postings Section */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between pb-3">
            <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em]">
            My Job Postings
            </h2>
            <Link href="/my-jobs" className="text-primary text-sm font-bold hover:underline">
                View All
            </Link>
        </div>
        
        <div className="bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
                Manage your job listings and view proposals from freelancers.
            </p>
            <div className="flex flex-col gap-3">
                <Link href="/my-jobs">
                    <button className="w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary/10 text-primary gap-2 text-base font-bold leading-normal tracking-[0.015em] px-6 hover:bg-primary/20 transition-colors">
                    Manage My Jobs
                    </button>
                </Link>
                <Link href="/post-job">
                    <button className="w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] px-6 hover:bg-primary/90 transition-colors">
                    Post a New Job
                    </button>
                </Link>
            </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
