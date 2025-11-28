"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jobController } from "@/app/controllers/JobController";
import { authController } from "@/app/controllers/AuthController";

export default function PostJob() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		category: "",
		description: "",
		requirements: "",
		budget: "",
		budgetType: "fixed",
		jobType: "full_time",
		skills: "",
	});

	// Check if user is logged in
	useEffect(() => {
		const checkAuth = async () => {
			const user = await authController.fetchCurrentUser();
			if (!user) {
				router.push("/login");
			}
		};
		checkAuth();
	}, [router]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setError("");
	};

	const handleNext = async () => {
		if (step < 4) {
			setStep(step + 1);
		} else {
			// Submit
			setLoading(true);
			setError("");
			try {
				// Transform data to match API expectations
				const jobData = {
					title: formData.title,
					description: formData.description,
					category: formData.category,
					budget: parseFloat(formData.budget) || 0,
					budgetType: formData.budgetType,
					jobType: formData.jobType,
					skills: formData.skills
						.split(",")
						.map((s) => s.trim())
						.filter((s) => s),
					requirements: formData.requirements,
				};

				const result = await jobController.postJob(jobData);
				if (result.success) {
					router.push("/my-jobs");
				} else {
					setError(
						result.error || "Failed to post job. Please try again."
					);
				}
			} catch (error) {
				console.error("Error posting job:", error);
				setError("Failed to post job. Please try again.");
			} finally {
				setLoading(false);
			}
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
		<div className='relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display'>
			{/* Top App Bar */}
			<div className='flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200/10'>
				<Link href='/dashboard'>
					<button className='text-slate-400 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-500/10 transition-colors'>
						<span className='material-symbols-outlined text-2xl'>
							close
						</span>
					</button>
				</Link>
				<h2 className='text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center'>
					Post a Job
				</h2>
				<div className='w-10 h-10'></div>
			</div>

			{/* Main Content */}
			<main className='flex-1 flex flex-col max-w-3xl mx-auto w-full'>
				{/* Page Indicators */}
				<div className='flex w-full flex-row items-center justify-center gap-3 py-5 px-4'>
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className={`h-2 flex-1 rounded-full transition-colors ${
								i <= step
									? "bg-primary"
									: "bg-slate-300 dark:bg-slate-700"
							}`}
						></div>
					))}
				</div>

				<div className='px-4 py-3 flex-1'>
					{step === 1 && (
						<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
							<h1 className='text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-2 pt-2'>
								Job Title & Category
							</h1>
							<p className='text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pb-6'>
								Start with a clear title that describes the
								project, then select a category so the right
								freelancers can find it.
							</p>
							<div className='space-y-6'>
								<label className='flex flex-col w-full'>
									<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
										Job Title
									</p>
									<input
										name='title'
										className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal'
										placeholder='e.g., Senior UX/UI Designer'
										value={formData.title}
										onChange={handleChange}
									/>
								</label>
								<label className='flex flex-col w-full'>
									<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
										Category
									</p>
									<div className='relative'>
										<select
											name='category'
											className='form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pl-4 pr-10 text-base font-normal leading-normal'
											value={formData.category}
											onChange={handleChange}
										>
											<option value=''>
												Select a category
											</option>
											<option value='Development'>
												Development & IT
											</option>
											<option value='Design'>
												Design & Creative
											</option>
											<option value='Writing'>
												Writing & Translation
											</option>
											<option value='Marketing'>
												Sales & Marketing
											</option>
											<option value='Admin'>
												Admin & Customer Support
											</option>
										</select>
										<span className='material-symbols-outlined text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
											expand_more
										</span>
									</div>
								</label>
							</div>
						</div>
					)}

					{step === 2 && (
						<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
							<h1 className='text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-2 pt-2'>
								Description & Requirements
							</h1>
							<p className='text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pb-6'>
								Describe the job in detail and list the
								requirements for the candidate.
							</p>
							<div className='space-y-6'>
								<label className='flex flex-col w-full'>
									<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
										Description
									</p>
									<textarea
										name='description'
										rows='6'
										className='form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary p-[15px] text-base font-normal leading-normal'
										placeholder='Describe the project details...'
										value={formData.description}
										onChange={handleChange}
									/>
								</label>
								<label className='flex flex-col w-full'>
									<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
										Requirements (one per line)
									</p>
									<textarea
										name='requirements'
										rows='4'
										className='form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary p-[15px] text-base font-normal leading-normal'
										placeholder='e.g. 5+ years experience&#10;Knowledge of React'
										value={formData.requirements}
										onChange={handleChange}
									/>
								</label>
							</div>
						</div>
					)}

					{step === 3 && (
						<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
							<h1 className='text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-2 pt-2'>
								Budget & Details
							</h1>
							<p className='text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pb-6'>
								Set your budget and other job details.
							</p>
							<div className='space-y-6'>
								<div className='grid grid-cols-2 gap-4'>
									<label className='flex flex-col w-full'>
										<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
											Budget ($)
										</p>
										<input
											name='budget'
											type='number'
											className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal'
											placeholder='500'
											value={formData.budget}
											onChange={handleChange}
										/>
									</label>
									<label className='flex flex-col w-full'>
										<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
											Budget Type
										</p>
										<select
											name='budgetType'
											className='form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pl-4 pr-10 text-base font-normal leading-normal'
											value={formData.budgetType}
											onChange={handleChange}
										>
											<option value='fixed'>
												Fixed Price
											</option>
											<option value='hourly'>
												Hourly
											</option>
										</select>
									</label>
								</div>
								<label className='flex flex-col w-full'>
									<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
										Job Type
									</p>
									<select
										name='jobType'
										className='form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] pl-4 pr-10 text-base font-normal leading-normal'
										value={formData.jobType}
										onChange={handleChange}
									>
										<option value='full_time'>
											Full-time
										</option>
										<option value='part_time'>
											Part-time
										</option>
										<option value='contract'>
											Contract
										</option>
										<option value='freelance'>
											Freelance
										</option>
									</select>
								</label>
								<label className='flex flex-col w-full'>
									<p className='text-slate-900 dark:text-white text-base font-medium leading-normal pb-2'>
										Skills (comma separated)
									</p>
									<input
										name='skills'
										className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal'
										placeholder='React, Node.js, Design'
										value={formData.skills}
										onChange={handleChange}
									/>
								</label>
							</div>
						</div>
					)}

					{step === 4 && (
						<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
							<h1 className='text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-2 pt-2'>
								Review & Post
							</h1>
							<p className='text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pb-6'>
								Review your job details before posting.
							</p>
							{error && (
								<div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400'>
									{error}
								</div>
							)}
							<div className='bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 space-y-4'>
								<div>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										Title
									</p>
									<p className='font-bold text-slate-900 dark:text-white text-lg'>
										{formData.title}
									</p>
								</div>
								<div>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										Category
									</p>
									<p className='font-medium text-slate-900 dark:text-white'>
										{formData.category}
									</p>
								</div>
								<div>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										Budget
									</p>
									<p className='font-medium text-slate-900 dark:text-white'>
										${formData.budget} (
										{formData.budgetType === "fixed"
											? "Fixed Price"
											: "Hourly"}
										)
									</p>
								</div>
								<div>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										Job Type
									</p>
									<p className='font-medium text-slate-900 dark:text-white capitalize'>
										{formData.jobType.replace(/_/g, " ")}
									</p>
								</div>
								{formData.skills && (
									<div>
										<p className='text-sm text-slate-500 dark:text-slate-400'>
											Skills
										</p>
										<div className='flex flex-wrap gap-2 mt-1'>
											{formData.skills
												.split(",")
												.map((skill, i) => (
													<span
														key={i}
														className='px-3 py-1 bg-primary/10 text-primary text-sm rounded-full'
													>
														{skill.trim()}
													</span>
												))}
										</div>
									</div>
								)}
								<div>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										Description
									</p>
									<p className='text-slate-900 dark:text-white whitespace-pre-line'>
										{formData.description}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</main>

			{/* Footer Navigation */}
			<footer className='sticky bottom-0 bg-background-light dark:bg-background-dark p-4 border-t border-slate-200/10'>
				<div className='flex items-center justify-between gap-4 max-w-3xl mx-auto w-full'>
					<button
						onClick={handleBack}
						className='flex items-center justify-center h-14 px-8 font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 rounded-xl w-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors'
					>
						Back
					</button>
					<button
						onClick={handleNext}
						disabled={loading}
						className='flex items-center justify-center h-14 px-8 font-bold text-white bg-primary rounded-xl w-full hover:bg-primary/90 transition-colors disabled:opacity-50'
					>
						{loading
							? "Posting..."
							: step === 4
								? "Post Job"
								: "Next"}
					</button>
				</div>
			</footer>
		</div>
	);
}
