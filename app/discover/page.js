"use client";

export default function DiscoverPage() {
	return (
		<div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
			{/* Top App Bar */}
			<header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
				<div className="flex items-center p-4 pb-2 justify-between">
					<div className="flex size-10 shrink-0 items-center justify-center">
						<span className="material-symbols-outlined text-gray-800 dark:text-white text-2xl">
							widgets
						</span>
					</div>

					<h1 className="text-gray-900 dark:text-white text-lg font-bold flex-1 text-center">
						Discover
					</h1>

					<div className="flex size-10 shrink-0 items-center justify-center">
						<img
							className="h-8 w-8 rounded-full object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2RVkFjRDPiM3FbSR5bsagvejbZr_f7tA2lu-sjnhVKR5jWKZmJ_LFBN0jpqtUBFtYODAJcNRHHcYUZFzx-KUHPG2omv0gMyXMkhCtBRC5sfoXZQpvxlh-Cuh5_JrWeFbOMtw0V3p626-9brKMSEUzWKEm8VIVi5bpYQxrDiy749SBRK7Nc2rS6QaEAi7ZkyOa9lKGaAJMOJkCurb3VKxD3GnBmNjcXSNQZNoI4pkqvoxKRkZSOL9tCSMF8bSb1_4mXcKjxKES07ic"
							alt="profile"
						/>
					</div>
				</div>
			</header>

			<main className="flex-grow">
				{/* Segmented Buttons */}
				<div className="flex px-4 py-3">
					<div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
						<label className="flex cursor-pointer h-full grow items-center justify-center rounded-md px-2 has-[:checked]:bg-background-light has-[:checked]:dark:bg-background-dark has-[:checked]:shadow-sm text-gray-500 dark:text-gray-400 has-[:checked]:text-gray-900 has-[:checked]:dark:text-white text-sm font-medium transition-all">
							<span className="truncate">Find Jobs</span>
							<input
								type="radio"
								name="search-type-toggle"
								defaultChecked
								className="invisible w-0"
							/>
						</label>

						<label className="flex cursor-pointer h-full grow items-center justify-center rounded-md px-2 has-[:checked]:bg-background-light has-[:checked]:dark:bg-background-dark has-[:checked]:shadow-sm text-gray-500 dark:text-gray-400 has-[:checked]:text-gray-900 has-[:checked]:dark:text-white text-sm font-medium transition-all">
							<span className="truncate">Find Freelancers</span>
							<input
								type="radio"
								name="search-type-toggle"
								className="invisible w-0"
							/>
						</label>
					</div>
				</div>

				{/* Search Bar */}
				<div className="px-4 py-3">
					<label className="flex flex-col min-w-40 h-12 w-full">
						<div className="flex w-full items-stretch rounded-lg h-full">
							<div className="text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 flex items-center justify-center pl-4 rounded-l-lg">
								<span className="material-symbols-outlined">
									search
								</span>
							</div>
							<input
								className="flex-1 bg-gray-200 dark:bg-gray-800 border-none px-4 pl-2 text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
								placeholder="Search by keyword, skill..."
							/>
						</div>
					</label>
				</div>

				{/* Chips */}
				<div className="flex gap-3 px-4 py-3 overflow-x-auto">
					{[
						{
							label: "Category",
							icon: "expand_more",
							active: true,
						},
						{ label: "Skills", icon: "expand_more" },
						{ label: "Location", icon: "expand_more" },
						{ label: "Budget", icon: "expand_more" },
						{ label: "All Filters", icon: "tune" },
					].map((chip, i) => (
						<button
							key={i}
							className={`flex h-9 shrink-0 items-center gap-2 rounded-full pl-4 pr-3 
                ${
					chip.active
						? "bg-primary/20 text-primary"
						: "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
				}
              `}>
							<p className="text-sm font-medium">{chip.label}</p>
							<span className="material-symbols-outlined text-lg">
								{chip.icon}
							</span>
						</button>
					))}
				</div>

				{/* Results Count / Sort */}
				<div className="flex items-center justify-between px-4 pt-4 pb-2">
					<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
						Showing 124 results
					</p>
					<button className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200 text-sm font-medium">
						<span>Sort by: Relevance</span>
						<span className="material-symbols-outlined text-base">
							swap_vert
						</span>
					</button>
				</div>

				{/* JOB CARDS */}
				<div className="flex flex-col gap-4 p-4">
					{/* Card 1 */}
					<JobCard
						title="Senior UX/UI Designer"
						company="Zenith Corp, San Francisco, CA"
						salary="$5,000 - $8,000"
						time="Posted 2h ago"
						skills={["Figma", "User Research", "Prototyping"]}
						logo="https://lh3.googleusercontent.com/aida-public/AB6AXuASu6_KhI_phMuV5gDaDY1y-QosuMDZtXowIeeQO00mqQ7PBwNGb_I3p6dtk_wJH4yV-7IHENoe-XAcluWubmHcZgH8d2P2T4rK8jH738e1aEjV7qIlubj68X0gx_A4zn2hMWWBudnvrYXEhouxRNZPgS4oiYFKqeR8KKUkSY6D0nosj_ryjyHju9OEwDuksWZ3LOuOvNac3Zvd4Zyyoy9ueiB3BtmBNtfhfdzAZXAkOdSnds0v2F_3avoKmZy4r-jVURuW-SlhL8I1"
					/>

					{/* Card 2 */}
					<JobCard
						title="Lead Backend Engineer (Remote)"
						company="Innovate LLC, Remote"
						salary="$120/hr"
						time="Posted 1d ago"
						skills={["Python", "AWS", "Docker"]}
						logo="https://lh3.googleusercontent.com/aida-public/AB6AXuA-EHeAzeUBqZhXN044eid82MHRDMa_dNeA-P436wBh9SvtMD3_VHxt2LuB6H-ZE6eFt6JJcj-Z8KC4CXhaBiuoppoiIE-oq45PB6RUQVN2QdozeEV6oETT7kGyV4Yieszo3vGlaS8z1jkBBIzxSkN3E3yMbqYohcA2vofUf8uqgu8anMjOdAi-lF9yxAXsnpcqlvxslP_p_wBlzr_7MJGWwzfID8PDh00cPMCavemFIwrLLFKqBEryotKDOVPjfd9IxpDyJcdggHBi"
					/>

					{/* Card 3 */}
					<JobCard
						title="Digital Marketing Specialist"
						company="Momentum Inc, New York, NY"
						salary="$4,500 budget"
						time="Posted 3d ago"
						skills={["SEO", "Google Ads", "Content Strategy"]}
						logo="https://lh3.googleusercontent.com/aida-public/AB6AXuDnk2X63j6uROoznaD9mRDBjrMRZ6dqCYfZghGdhxgJCYnAct1ifPOIjeYKJ4UFHsqiOP3XVjdV3f2KaQibGtwINNW6gHt7zHNTKF44v4zbKMklGRuJiMPWkPq4K7jVatSw_L4nNRNqaeOh2b2s0x_kgrxlzzfWCfzsVD2yfwmbA10N84RsF_4UpQHHR_Z5e9DbVgR0NaSfDkxX7D_v1aSlmNhOlEJYufBq0U3qSLOs2knSWjGpu-EuRBnkC_8QkgoD2LcHO_skpx2Y"
					/>
				</div>
			</main>

			{/* Bottom Navigation */}
			<footer className="sticky bottom-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
				<nav className="flex justify-around items-center h-16">
					<NavItem icon="search" label="Discover" active />

					<NavItem icon="work" label="Projects" />
					<NavItem icon="chat_bubble" label="Messages" />
					<NavItem icon="person" label="Profile" />
				</nav>
			</footer>
		</div>
	);
}

// Job Card Component
function JobCard({ title, company, salary, time, skills, logo }) {
	return (
		<div className="flex flex-col gap-4 rounded-xl bg-gray-100 dark:bg-gray-900/50 p-4 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-col gap-1.5">
					<p className="text-gray-900 dark:text-white text-base font-bold">
						{title}
					</p>
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						{company}
					</p>
					<p className="text-primary text-sm font-semibold">
						{salary}
					</p>
				</div>

				<div
					className="w-16 h-16 bg-center bg-cover rounded-lg flex-shrink-0"
					style={{ backgroundImage: `url('${logo}')` }}></div>
			</div>

			<div className="flex items-center justify-between gap-2">
				<div className="flex flex-wrap gap-2">
					{skills.map((s, i) => (
						<span
							key={i}
							className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 rounded-full">
							{s}
						</span>
					))}
				</div>
				<p className="text-gray-500 dark:text-gray-500 text-xs">
					{time}
				</p>
			</div>
		</div>
	);
}

// Navigation Link Component
function NavItem({ icon, label, active }) {
	return (
		<a
			className={`flex flex-col items-center justify-center w-full ${
				active ? "text-primary" : "text-gray-500 dark:text-gray-400"
			}`}
			href="#">
			<span className="material-symbols-outlined">{icon}</span>
			<span className="text-xs font-medium">{label}</span>
		</a>
	);
}
