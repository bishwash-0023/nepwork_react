"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { jobController } from "@/app/controllers/JobController";
import { authController } from "@/app/controllers/AuthController";

export default function MyJobs() {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	// Helper to format status
	const getStatusStyle = (status) => {
		const styles = {
			open: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
			in_progress:
				"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
			completed:
				"bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
			cancelled:
				"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
		};
		return styles[status?.toLowerCase()] || styles["open"];
	};

	const formatStatus = (status) => {
		if (!status) return "Open";
		return status
			.replace(/_/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());
	};

	useEffect(() => {
		const fetchMyJobs = async () => {
			try {
				// Check if user is logged in
				const user = await authController.fetchCurrentUser();
				if (!user) {
					router.push("/login");
					return;
				}

				const response = await jobController.getMyJobs();
				const jobsList = response?.results || response || [];
				setJobs(jobsList);
			} catch (error) {
				console.error("Error fetching my jobs:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchMyJobs();
	}, [router]);

	const handleDeleteJob = async (jobId) => {
		if (!confirm("Are you sure you want to delete this job?")) return;

		try {
			const result = await jobController.deleteJob(jobId);
			if (result.success) {
				setJobs(jobs.filter((j) => j.id !== jobId));
			}
		} catch (error) {
			console.error("Error deleting job:", error);
		}
	};

	return (
		<DashboardLayout>
			<div className='min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8'>
				<div className='max-w-5xl mx-auto'>
					<div className='flex justify-between items-center mb-8'>
						<div>
							<h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
								My Jobs
							</h1>
							<p className='text-gray-500 dark:text-gray-400 mt-1'>
								Manage your job postings and view proposals
							</p>
						</div>
						<Link href='/post-job'>
							<button className='flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20'>
								<span className='material-symbols-outlined'>
									add
								</span>
								Post New Job
							</button>
						</Link>
					</div>

					{loading ? (
						<div className='flex justify-center py-12'>
							<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
						</div>
					) : jobs.length > 0 ? (
						<div className='grid gap-6'>
							{jobs.map((job) => (
								<div
									key={job.id}
									className='bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow'
								>
									<div className='p-6'>
										<div className='flex flex-col md:flex-row justify-between items-start gap-4'>
											<div className='flex-1'>
												<div className='flex items-center gap-3 mb-2'>
													<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
														{job.title}
													</h3>
													<span
														className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusStyle(job.status)}`}
													>
														{formatStatus(
															job.status
														)}
													</span>
												</div>
												<p className='text-gray-500 dark:text-gray-400 text-sm mb-4'>
													Posted{" "}
													{job.postedTime ||
														job.timeAgo ||
														"recently"}{" "}
													•{" "}
													{job.jobType ||
														job.type ||
														"Not specified"}{" "}
													• ${job.budget || 0} (
													{job.budgetType || "Fixed"})
												</p>
												<div className='flex gap-4 text-sm text-gray-600 dark:text-gray-300'>
													<span className='flex items-center gap-1'>
														<span className='material-symbols-outlined text-lg'>
															description
														</span>
														{job.proposalCount ||
															job.proposals ||
															0}{" "}
														Proposals
													</span>
													{job.category && (
														<span className='flex items-center gap-1'>
															<span className='material-symbols-outlined text-lg'>
																category
															</span>
															{job.category}
														</span>
													)}
												</div>
											</div>
											<div className='flex gap-3 w-full md:w-auto'>
												<Link
													href={`/my-jobs/${job.id}/edit`}
												>
													<button className='flex-1 md:flex-none px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
														Edit
													</button>
												</Link>
												<Link
													href={`/my-jobs/${job.id}/proposals`}
												>
													<button className='flex-1 md:flex-none px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold hover:bg-primary/20 transition-colors'>
														View Proposals
													</button>
												</Link>
												<button
													onClick={() =>
														handleDeleteJob(job.id)
													}
													className='flex-1 md:flex-none px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-20 bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700'>
							<span className='material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4'>
								work_off
							</span>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
								No jobs posted yet
							</h3>
							<p className='text-gray-500 dark:text-gray-400 mt-2 mb-6'>
								Create your first job posting to start hiring.
							</p>
							<Link href='/post-job'>
								<button className='px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors'>
									Post a Job
								</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}
