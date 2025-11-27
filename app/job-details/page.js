export default function JobDetails() {
	return (
		<div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen">
			<div className="relative min-h-screen w-full flex-col">
				{/* Sticky Top App Bar */}
				<div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 backdrop-blur-sm">
					<button className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full">
						<span className="material-symbols-outlined text-secondary dark:text-text-dark">
							arrow_back
						</span>
					</button>
					<h2 className="flex-1 truncate text-center text-lg font-bold leading-tight tracking-tight text-secondary dark:text-text-dark">
						Senior UX Designer
					</h2>
					<div className="flex w-10 items-center justify-end">
						<button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
							<span className="material-symbols-outlined text-secondary dark:text-text-dark">
								share
							</span>
						</button>
					</div>
				</div>

				<main className="flex-1 pb-28">
					{/* Header Section */}
					<div className="p-4 pt-6">
						<h1 className="text-secondary dark:text-white text-3xl font-bold leading-tight tracking-tight">
							Senior UX Designer for Mobile App
						</h1>
					</div>

					{/* Client Info List Item */}
					<div className="flex items-center justify-between gap-4 border-b border-border-light dark:border-border-dark px-4 py-4">
						<div className="flex items-center gap-4">
							<div
								className="aspect-square size-14 rounded-lg bg-cover bg-center bg-no-repeat"
								style={{
									backgroundImage:
										'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6yUuzkMIeDE79ndWOkCXQIbALhkkNfl8rZpOTRfGB-qscuPxszyEX6hfPFOvk5NpGrW3e9AeDO9ipcPUw47mE6neq7q11JuY8_LEnGYTxqZuhoEv53VuKPV8w19lPuGkffKkwgyhWj3dvZ-efNIOp1jikA01DjBjAyoCib38RwpD49-VddkNBT08heOy1Wc67qdSSwnZka75JPoiH3z-m8sho7xsMXAB9ks86Yce7h560Y1pW6PTOWAI45xlmVx9H9b3ghZXbsHxn")',
								}}></div>

							<div className="flex flex-col justify-center">
								<p className="text-base font-bold text-secondary dark:text-white">
									Innovatech Solutions
								</p>
								<p className="text-sm text-text-muted-light dark:text-text-muted-dark">
									San Francisco, CA
								</p>
							</div>
						</div>

						<button className="shrink-0">
							<span
								className="material-symbols-outlined text-primary"
								style={{
									fontVariationSettings:
										"'FILL' 1, 'wght' 700",
								}}>
								bookmark
							</span>
						</button>
					</div>

					{/* Job Metrics Grid */}
					<div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3">
						<div className="flex flex-col gap-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4">
							<span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
								payments
							</span>
							<div className="flex flex-col gap-1">
								<h2 className="text-base font-bold text-secondary dark:text-white">
									$80 - $120 /hr
								</h2>
								<p className="text-sm text-text-muted-light dark:text-text-muted-dark">
									Budget
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4">
							<span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
								signal_cellular_alt
							</span>
							<div className="flex flex-col gap-1">
								<h2 className="text-base font-bold text-secondary dark:text-white">
									Expert Level
								</h2>
								<p className="text-sm text-text-muted-light dark:text-text-muted-dark">
									Experience
								</p>
							</div>
						</div>

						<div className="col-span-2 flex flex-col gap-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 md:col-span-1">
							<span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
								schedule
							</span>
							<div className="flex flex-col gap-1">
								<h2 className="text-base font-bold text-secondary dark:text-white">
									3-6 Months
								</h2>
								<p className="text-sm text-text-muted-light dark:text-text-muted-dark">
									Project Length
								</p>
							</div>
						</div>
					</div>

					{/* Job Description */}
					<div className="px-4">
						<div className="rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4">
							<h3 className="pb-2 text-lg font-bold leading-tight tracking-tight text-secondary dark:text-white">
								Job Description
							</h3>

							<div className="space-y-4 text-base leading-relaxed text-text-muted-light dark:text-text-muted-dark">
								<p>
									We are seeking a talented and experienced
									Senior UX Designer to lead the design of our
									new flagship mobile application. You will be
									responsible for the entire design process...
								</p>

								<p className="hidden">
									Your role will involve conducting user
									interviews, creating user personas and
									journey maps...
								</p>

								<button className="font-bold text-primary">
									Read More
								</button>
							</div>
						</div>
					</div>

					{/* Skills */}
					<div className="p-4">
						<div className="rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4">
							<h3 className="pb-3 text-lg font-bold text-secondary dark:text-white">
								Skills & Expertise
							</h3>

							<div className="flex flex-wrap gap-2">
								{[
									"User Research",
									"Wireframing",
									"Prototyping",
									"Figma",
									"Mobile App Design",
									"Usability Testing",
								].map((s) => (
									<span
										key={s}
										className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
										{s}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Client Info */}
					<div className="px-4">
						<div className="rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4">
							<h3 className="pb-3 text-lg font-bold text-secondary dark:text-white">
								About the Client
							</h3>

							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
										check_circle
									</span>
									<p className="text-base text-text-muted-light dark:text-text-muted-dark">
										Payment method verified
									</p>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex items-center">
										<span
											className="material-symbols-outlined text-accent"
											style={{
												fontVariationSettings:
													"'FILL' 1",
											}}>
											star
										</span>
										<span
											className="material-symbols-outlined text-accent"
											style={{
												fontVariationSettings:
													"'FILL' 1",
											}}>
											star
										</span>
										<span
											className="material-symbols-outlined text-accent"
											style={{
												fontVariationSettings:
													"'FILL' 1",
											}}>
											star
										</span>
										<span
											className="material-symbols-outlined text-accent"
											style={{
												fontVariationSettings:
													"'FILL' 1",
											}}>
											star
										</span>
										<span className="material-symbols-outlined text-accent">
											star_half
										</span>
									</div>

									<p className="text-base text-text-muted-light dark:text-text-muted-dark">
										4.8 of 15 reviews
									</p>
								</div>

								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
										work_history
									</span>
									<p className="text-base text-text-muted-light dark:text-text-muted-dark">
										25 jobs posted
									</p>
								</div>
							</div>
						</div>
					</div>
				</main>

				{/* Sticky Bottom CTA */}
				<div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 backdrop-blur-sm">
					<button className="w-full cursor-pointer rounded-xl bg-primary px-6 py-4 text-center text-lg font-bold text-white shadow-lg shadow-primary/30">
						Apply Now
					</button>
				</div>
			</div>
		</div>
	);
}
