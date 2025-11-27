export default function Page() {
	return (
		<div className="relative w-full flex-col">
			{/* Header */}
			<div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-20 border-b border-border-light dark:border-border-dark">
				<div className="flex size-10 items-center justify-center cursor-pointer">
					<span className="material-symbols-outlined text-2xl">
						arrow_back
					</span>
				</div>

				<h2 className="text-lg font-bold flex-1 text-center">
					Submit Proposal
				</h2>
				<div className="w-10"></div>
			</div>

			<div className="p-4 pb-28">
				{/* Job Title */}
				<h1 className="text-[28px] font-bold leading-tight pt-4 pb-3">
					Senior UX/UI Designer for Mobile App
				</h1>

				{/* Budget + Time */}
				<div className="grid grid-cols-2 gap-3 pt-4 pb-4">
					<div className="flex flex-col gap-1.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-4">
						<p className="text-xs font-medium text-text-light-secondary dark:text-dark-secondary">
							BUDGET
						</p>
						<p className="text-base font-semibold text-primary">
							$5,000
						</p>
						<p className="text-xs text-text-light-secondary dark:text-dark-secondary">
							Fixed Price
						</p>
					</div>

					<div className="flex flex-col gap-1.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-4">
						<p className="text-xs font-medium text-text-light-secondary dark:text-dark-secondary">
							BIDDING ENDS IN
						</p>
						<p className="text-base font-semibold text-primary">
							5 days, 8 hours
						</p>
						<p className="text-xs text-text-light-secondary dark:text-dark-secondary">
							15 bids so far
						</p>
					</div>
				</div>

				{/* Tabs */}
				<div className="w-full mt-4">
					<div className="border-b border-border-light dark:border-border-dark">
						<nav className="flex space-x-6 -mb-px">
							<a className="py-3 px-1 border-b-2 border-primary text-primary font-semibold">
								Job Description
							</a>
							<a className="py-3 px-1 border-b-2 border-transparent hover:text-primary hover:border-primary font-medium text-text-light-secondary dark:text-dark-secondary">
								Files (3)
							</a>
							<a className="py-3 px-1 border-b-2 border-transparent hover:text-primary hover:border-primary font-medium text-text-light-secondary dark:text-dark-secondary">
								Client Info
							</a>
						</nav>
					</div>

					<div className="py-6">
						<p className="text-base leading-relaxed">
							We are looking for a talented and experienced Senior
							UX/UI Designer to create an intuitive and visually
							stunning mobile application...
						</p>
					</div>
				</div>

				{/* Top Bids */}
				<div className="mt-2 mb-6">
					<h3 className="text-lg font-bold pb-3">Top Bids</h3>

					<div className="space-y-3">
						{/* Bid Card */}
						<div className="flex items-center gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 bg-white dark:bg-gray-800/20">
							<img
								className="h-10 w-10 rounded-full"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuByEb5O6hCWDTJTum_7gzKLe5w1X6Nsq64d9kSS4Qi63bVy5dQml2G5DROvvFl5AewsFeCOepAw2tbtnC49y0NKJnLgtGdrRZC07nuBZH8zgtfJ_ckIkvqTucdNPCGQ4fOrSfr1fv8zFgynleMZJmsZYGRcGcGdm0HAyv8ddWlrFGGUllF85AfVSygwLT_evxPBfzz5DWfK7nun3r8Qvnj899or-U6q7NPiZo6YuMtUaQovgu3bfREEDbjhhxZnnSoM1FQCRfxdjCt_"
								alt="bidder"
							/>
							<div className="flex-1">
								<p className="text-sm font-semibold">
									Jane Cooper
								</p>
								<p className="text-xs text-text-light-secondary dark:text-dark-secondary">
									98% Job Success
								</p>
							</div>
							<p className="text-sm font-bold text-primary">
								$4,800
							</p>
						</div>
					</div>
				</div>

				{/* Submit Proposal Form */}
				<div className="border-t border-border-light dark:border-border-dark pt-6 mt-2">
					<h2 className="text-xl font-bold mb-4">
						Submit Your Proposal
					</h2>

					<form className="space-y-6">
						{/* Amount */}
						<div>
							<label
								htmlFor="amount"
								className="block text-sm mb-1">
								Proposed Amount
							</label>

							<div className="relative rounded-lg">
								<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-light-secondary dark:text-dark-secondary">
									$
								</span>

								<input
									id="amount"
									type="number"
									placeholder="5000.00"
									className="w-full pl-7 pr-3 py-2.5 rounded-lg bg-transparent border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary text-base"
								/>
							</div>

							<p className="mt-2 text-xs text-text-light-secondary dark:text-dark-secondary">
								Includes all platform fees.
							</p>
						</div>

						{/* Cover Letter */}
						<div>
							<label
								htmlFor="cover-letter"
								className="block text-sm mb-1">
								Cover Letter
							</label>

							<textarea
								id="cover-letter"
								rows="6"
								placeholder="Introduce yourself and explain why you're a great fit..."
								className="w-full rounded-lg px-3 py-2.5 border border-border-light dark:border-border-dark bg-transparent focus:ring-2 focus:ring-primary"></textarea>
						</div>

						{/* File Upload */}
						<div>
							<label className="block text-sm mb-2">
								Your Qualification Files
							</label>

							<div className="border border-dashed border-border-light dark:border-border-dark rounded-lg px-6 py-10 text-center">
								<span className="material-symbols-outlined text-4xl text-text-light-secondary dark:text-dark-secondary">
									cloud_upload
								</span>

								<div className="mt-4 flex justify-center text-sm">
									<label className="cursor-pointer text-primary font-semibold">
										<span>Upload a file</span>
										<input
											type="file"
											id="file-upload"
											className="sr-only"
										/>
									</label>
									<p className="pl-1">or drag & drop</p>
								</div>

								<p className="text-xs text-text-light-secondary dark:text-dark-secondary">
									PDF, DOCX, PNG, JPG up to 10MB
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>

			{/* Bottom Submit Button */}
			<div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-border-light dark:border-border-dark z-10">
				<button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary/90 shadow-lg">
					Submit Proposal
				</button>
			</div>
		</div>
	);
}
