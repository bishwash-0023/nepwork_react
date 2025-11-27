"use client";

export default function Home() {
	return (
		<div className="relative flex min-h-screen w-full flex-col pb-24">
			{/* Top App Bar */}
			<header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
				<div className="flex items-center p-4">
					<div className="flex size-12 shrink-0 items-center justify-start">
						<div
							className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
							style={{
								backgroundImage:
									"url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6iye8KvUDWULbL1zLyLydsimavGrdef3VolvbHNTDY7JJUhYqffXE_7am5ybG166k5qnK37IeDX3UvIbWpvEwrgSlWRcCZQj8Vq8wZJ4nTwGm4iEsOzlLb7y66r2K24uAv2i9hzki-B8ER1BLhqXDO6esasAQU_1habAXbP1dboEBD4GRHdRI71Gm0R3JqHsoT4sA_Rkk5G9H1-57DlgdheDbRlWjCOcZQQ_fLPMq2fNzsZ5NR-8Druwn6he9VAktCqcxHZm8sK6A')",
							}}></div>
					</div>

					<h1 className="flex-1 text-lg font-bold text-slate-900 dark:text-white">
						NEPWORK
					</h1>

					<div className="flex w-12 items-center justify-end">
						<button className="flex h-12 items-center justify-center rounded-lg text-slate-600 dark:text-white">
							<span className="material-symbols-outlined">
								notifications
							</span>
						</button>
					</div>
				</div>

				{/* Search Bar */}
				<div className="px-4 pb-3">
					<label className="flex h-12 w-full">
						<div className="flex h-full w-full items-stretch rounded-xl shadow-sm">
							<div className="flex items-center justify-center rounded-l-xl border border-slate-200 bg-white pl-4 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
								<span className="material-symbols-outlined">
									search
								</span>
							</div>

							<input
								className="form-input h-full w-full rounded-r-xl border border-slate-200 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 focus:ring-primary/50 dark:focus:ring-primary/70"
								placeholder="Search jobs, skills, freelancers..."
							/>
						</div>
					</label>
				</div>

				{/* Segmented Buttons */}
				<div className="flex px-4 py-1">
					<div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
						<label className="flex h-full grow cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium text-slate-500 dark:text-slate-400 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:text-slate-900 dark:has-[:checked]:text-white">
							<span className="truncate">Find Work</span>
							<input
								type="radio"
								name="viewToggle"
								defaultChecked
								className="hidden"
							/>
						</label>

						<label className="flex h-full grow cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium text-slate-500 dark:text-slate-400 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:text-slate-900 dark:has-[:checked]:text-white">
							<span className="truncate">Find Talent</span>
							<input
								type="radio"
								name="viewToggle"
								className="hidden"
							/>
						</label>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex flex-col gap-4">
				<h3 className="px-4 pt-4 pb-0 text-lg font-bold text-slate-900 dark:text-white">
					Recommended For You
				</h3>

				{/* Job Posting Card 1 */}
				<div className="px-4">
					<div className="flex flex-col rounded-xl bg-white shadow-sm dark:bg-slate-800/50">
						<div
							className="w-full aspect-[3/1] rounded-t-xl bg-cover bg-center"
							style={{
								backgroundImage:
									"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDb1g19hwg7dNXfIOsrW-2nuh4xqsosb1g-L2Qj1zZ7-PVHA3PtnRQ4puV2h0etllV2lPoBLmLIEMuwVFds9CyxcSagIUg2dTSwWMlIuUDlJx7_FCKDKOWZTjBiVdZ_quGGh9Pp6zRdtPS_pbdJe-i4jw-4BliJ3irAaY899-rzdZyI7mgx4F1k5vM9gNWeI5HgEfzhdXwoN24BMFsMpiSnruZh0iuswkfkVdO2gPeDVdS7k1QugP4sXPuwKXxEYYwPxifrqo5Xt4H9')",
							}}></div>

						<div className="p-4 flex flex-col gap-2">
							<p className="text-sm text-slate-500 dark:text-slate-400">
								Innovate Inc.
							</p>

							<p className="text-lg font-bold text-slate-900 dark:text-white">
								Senior UX Designer for Mobile App
							</p>

							<div className="flex gap-2 pt-1">
								{["Figma", "User Research", "Prototyping"].map(
									(tag) => (
										<span
											key={tag}
											className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary dark:bg-primary/20">
											{tag}
										</span>
									)
								)}
							</div>

							<div className="flex justify-between pt-2">
								<p className="text-base text-slate-500 dark:text-slate-400">
									$5,000 budget – Posted 2h ago
								</p>

								<button className="h-10 min-w-[84px] rounded-lg bg-primary px-4 text-sm text-white shadow-sm hover:bg-primary/90">
									Apply Now
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Freelancer Card */}
				<div className="px-4">
					<div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800/50">
						<div
							className="size-16 rounded-full bg-cover bg-center"
							style={{
								backgroundImage:
									"url('https://media.licdn.com/dms/image/v2/D4D03AQEI4h4YR6DTyw/profile-displayphoto-shrink_200_200/B4DZZbN3ZRGsAY-/0/1745287084133?e=2147483647&v=beta&t=nQ2McL3RuGeJkyw643aS7SiU4ajyUZbJQjUJ18X1ses')",
							}}></div>

						<div className="flex flex-col min-w-0 flex-1">
							<div className="flex justify-between">
								<p className="truncate text-base font-bold text-slate-900 dark:text-white">
									Aayub niroula
								</p>

								<div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
									<span
										className="material-symbols-outlined text-base text-amber-400 dark:text-amber-300"
										style={{
											fontVariationSettings: "'FILL' 1",
										}}>
										star
									</span>
									<span className="text-sm font-medium">
										4.9
									</span>
								</div>
							</div>

							<p className="truncate text-sm text-slate-500 dark:text-slate-400">
								Lead UI/UX Designer
							</p>
							<p className="truncate text-sm text-slate-500 dark:text-slate-400">
								$95/hr
							</p>
						</div>

						<button className="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
							View
						</button>
					</div>
				</div>

				{/* Job Posting Card 2 */}
				<div className="px-4">
					<div className="flex flex-col rounded-xl bg-white shadow-sm dark:bg-slate-800/50">
						<div
							className="w-full aspect-[3/1] rounded-t-xl bg-cover bg-center"
							style={{
								backgroundImage:
									"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDygLHgXVd_pIMLT4waeNc5RgmnrStmHp-COxnQa9mpFgzvO2y4euoIY8DDXMNhgDpW8jaEf2ONFa4gugbfwG0-gKij1Ry1XTl-zE1O5qmGRa9q2umCIEHTAQHC4zRVGgCjWVRevTzu-XRXWY9ZaNR9pEwUOzwHgkT8GxZp0V0HAx2pJ6Sh77krGpePeco1iBnd6PcryVbarQZEzQhsT4qhHDOiFwNsoIr4Oq12xS5OVzMjkJHljkzm0Ks-mHCsd_LrQ3t1zCRhkcNu')",
							}}></div>

						<div className="p-4 flex flex-col gap-2">
							<p className="text-sm text-slate-500 dark:text-slate-400">
								Tech Solutions Ltd.
							</p>

							<p className="text-lg font-bold text-slate-900 dark:text-white">
								Full-Stack Developer (React & Node.js)
							</p>

							<div className="flex gap-2 pt-1">
								{["React", "Node.js", "MongoDB"].map((tag) => (
									<span
										key={tag}
										className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary dark:bg-primary/20">
										{tag}
									</span>
								))}
							</div>

							<div className="flex justify-between pt-2">
								<p className="text-base text-slate-500 dark:text-slate-400">
									$8,000 budget – Posted 5h ago
								</p>

								<button className="h-10 min-w-[84px] rounded-lg bg-primary px-4 text-sm text-white shadow-sm hover:bg-primary/90">
									Apply Now
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Project Status Card */}
				<div className="px-4">
					<div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800/50">
						<div className="flex justify-between">
							<div>
								<p className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
									Active Project
								</p>
								<p className="text-base font-bold text-slate-900 dark:text-white">
									E-commerce Platform Redesign
								</p>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									with John Appleseed
								</p>
							</div>

							<div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/20 dark:text-green-300">
								In Progress
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Floating Action Button */}
			<div className="fixed bottom-24 right-4 z-10">
				<button className="flex size-14 rounded-full bg-primary text-white shadow-lg hover:scale-105">
					<span className="material-symbols-outlined !text-3xl">
						add
					</span>
				</button>
			</div>

			{/* Bottom Navigation */}
			<nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-background-light/80 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/80">
				<div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
					{[
						["home", "Home"],
						["chat_bubble", "Messages"],
						["work", "Projects"],
						["person", "Profile"],
					].map(([icon, label], idx) => (
						<a
							key={idx}
							className={`flex flex-col items-center gap-1 ${
								idx === 0
									? "text-primary"
									: "text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
							}`}
							href="#">
							<span className="material-symbols-outlined">
								{icon}
							</span>
							<span className="text-xs font-medium">{label}</span>
						</a>
					))}
				</div>
			</nav>
		</div>
	);
}
