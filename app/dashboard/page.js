"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { authController } from "@/app/controllers/AuthController";
import { jobController } from "@/app/controllers/JobController";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const [user, setUser] = useState(null);
	const [activeJobs, setActiveJobs] = useState([]);
	const [proposals, setProposals] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	// Helper function to get status styling
	const getStatusStyle = (status) => {
		const styles = {
			open: "text-primary bg-primary/20",
			in_progress: "text-blue-500 bg-blue-500/20",
			completed: "text-green-500 bg-green-500/20",
			cancelled: "text-red-500 bg-red-500/20",
			pending: "text-orange-500 bg-orange-500/20",
			accepted: "text-green-500 bg-green-500/20",
			rejected: "text-red-500 bg-red-500/20",
		};
		return styles[status?.toLowerCase()] || "text-gray-500 bg-gray-500/20";
	};

	// Format status for display
	const formatStatus = (status) => {
		if (!status) return "Unknown";
		return status
			.replace(/_/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch current user
				const currentUser = await authController.fetchCurrentUser();
				if (!currentUser) {
					router.push("/login");
					return;
				}
				setUser(currentUser);

				// Fetch active jobs (user's posted jobs or jobs they're working on)
				const myJobsResponse = await jobController.getMyJobs();
				const myJobs = myJobsResponse?.results || myJobsResponse || [];

				// Transform jobs for display
				const transformedJobs = myJobs.slice(0, 5).map((job) => ({
					id: job.id,
					title: job.title,
					freelancer:
						job.hiredFreelancer?.fullName ||
						job.hiredFreelancer?.username ||
						"Not assigned",
					avatar:
						job.hiredFreelancer?.avatar ||
						`https://ui-avatars.com/api/?name=${encodeURIComponent(job.hiredFreelancer?.username || "NA")}&background=random`,
					status: job.status,
					statusColor: getStatusStyle(job.status),
				}));
				setActiveJobs(transformedJobs);

				// Fetch proposals for user's jobs (if client)
				if (currentUser.role === "client" && myJobs.length > 0) {
					// Get proposals for first job (or could aggregate)
					const allProposals = [];
					for (const job of myJobs.slice(0, 3)) {
						try {
							const jobProposals =
								await jobController.getProposals(job.id);
							const proposalsList =
								jobProposals?.results || jobProposals || [];
							allProposals.push(
								...proposalsList.map((p) => ({
									...p,
									jobTitle: job.title,
								}))
							);
						} catch (err) {
							console.log(
								"Error fetching proposals for job",
								job.id
							);
						}
					}
					setProposals(allProposals.slice(0, 5));
				} else if (currentUser.role === "freelancer") {
					// Fetch freelancer's own proposals
					const myProposals = await jobController.getMyProposals();
					const proposalsList =
						myProposals?.results || myProposals || [];
					setProposals(proposalsList.slice(0, 5));
				}
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [router]);

	if (loading)
		return (
			<div className='flex items-center justify-center min-h-screen'>
				Loading...
			</div>
		);

	return (
		<DashboardLayout user={user}>
			{/* Active Jobs Section */}
			<section className='py-4'>
				<h2 className='text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-3'>
					Active Jobs
				</h2>
				<div className='flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pl-4 pr-1'>
					<div className='flex items-stretch gap-3'>
						{activeJobs.length === 0 ? (
							<div className='flex h-full flex-col gap-3 rounded-xl bg-white dark:bg-[#192430] p-4 min-w-64 border border-gray-200 dark:border-gray-700'>
								<p className='text-gray-500 dark:text-gray-400 text-sm'>
									No active jobs yet
								</p>
								<Link
									href='/post-job'
									className='text-primary text-sm font-bold hover:underline'
								>
									Post a Job
								</Link>
							</div>
						) : (
							activeJobs.map((job) => (
								<Link href={`/jobs/${job.id}`} key={job.id}>
									<div className='flex h-full flex-col gap-3 rounded-xl bg-white dark:bg-[#192430] p-4 min-w-64 border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors cursor-pointer'>
										<h3 className='text-gray-900 dark:text-gray-100 text-base font-bold leading-normal'>
											{job.title}
										</h3>
										<div className='flex items-center gap-2'>
											<div
												className='bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6'
												style={{
													backgroundImage: `url("${job.avatar}")`,
												}}
											></div>
											<p className='text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal'>
												{job.freelancer}
											</p>
										</div>
										<div className='mt-1'>
											<span
												className={`text-xs font-bold py-1 px-2.5 rounded-full ${job.statusColor}`}
											>
												{formatStatus(job.status)}
											</span>
										</div>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</section>

			{/* Incoming Proposals Section */}
			<section className='pt-4'>
				<h2 className='text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2'>
					{user?.role === "freelancer"
						? "My Proposals"
						: "Incoming Proposals"}
				</h2>

				{/* Proposal List */}
				<div className='flex flex-col gap-3 px-4 pt-2'>
					{proposals.length === 0 ? (
						<div className='flex flex-col gap-4 rounded-xl bg-white dark:bg-[#192430] p-4 border border-gray-200 dark:border-gray-700'>
							<p className='text-gray-500 dark:text-gray-400 text-center'>
								{user?.role === "freelancer"
									? "No proposals submitted yet"
									: "No proposals received yet"}
							</p>
							{user?.role === "freelancer" && (
								<Link
									href='/jobs'
									className='text-primary text-sm font-bold hover:underline text-center'
								>
									Browse Jobs
								</Link>
							)}
						</div>
					) : (
						proposals.map((proposal) => (
							<div
								key={proposal.id}
								className='flex flex-col gap-4 rounded-xl bg-white dark:bg-[#192430] p-4 border border-gray-200 dark:border-gray-700'
							>
								<div className='flex items-start justify-between'>
									<div className='flex items-center gap-3'>
										<div
											className='bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12'
											style={{
												backgroundImage: `url("${proposal.freelancer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(proposal.freelancer?.username || "User")}&background=random`}")`,
											}}
										></div>
										<div>
											<p className='text-gray-900 dark:text-gray-100 font-bold'>
												{proposal.freelancer
													?.fullName ||
													proposal.freelancer
														?.username ||
													"Unknown"}
											</p>
											<p className='text-gray-500 dark:text-gray-400 text-sm'>
												{proposal.jobTitle ||
													"Job Proposal"}
											</p>
										</div>
									</div>
									<div className='text-right'>
										<p className='text-gray-900 dark:text-gray-100 text-lg font-bold'>
											$
											{proposal.bidAmount ||
												proposal.proposedRate ||
												0}
										</p>
										<span
											className={`text-xs font-bold py-1 px-2.5 rounded-full ${getStatusStyle(proposal.status)}`}
										>
											{formatStatus(proposal.status)}
										</span>
									</div>
								</div>
								<p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2'>
									{proposal.coverLetter ||
										"No cover letter provided"}
								</p>
								<div className='flex gap-3'>
									<Link
										href={`/messages`}
										className='flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-4 hover:bg-primary/30 transition-colors'
									>
										Message
									</Link>
									<Link
										href={`/my-jobs/${proposal.job}/proposals`}
										className='flex flex-1 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-4 hover:bg-primary/90 transition-colors'
									>
										View Proposal
									</Link>
								</div>
							</div>
						))
					)}
				</div>
			</section>

			{/* My Job Postings Section */}
			<section className='px-4 py-6'>
				<div className='flex items-center justify-between pb-3'>
					<h2 className='text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em]'>
						My Job Postings
					</h2>
					<Link
						href='/my-jobs'
						className='text-primary text-sm font-bold hover:underline'
					>
						View All
					</Link>
				</div>

				<div className='bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center'>
					<p className='text-gray-500 dark:text-gray-400 mb-4'>
						Manage your job listings and view proposals from
						freelancers.
					</p>
					<div className='flex flex-col gap-3'>
						<Link href='/my-jobs'>
							<button className='w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary/10 text-primary gap-2 text-base font-bold leading-normal tracking-[0.015em] px-6 hover:bg-primary/20 transition-colors'>
								Manage My Jobs
							</button>
						</Link>
						<Link href='/post-job'>
							<button className='w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] px-6 hover:bg-primary/90 transition-colors'>
								Post a New Job
							</button>
						</Link>
					</div>
				</div>
			</section>
		</DashboardLayout>
	);
}
