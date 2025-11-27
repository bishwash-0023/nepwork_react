"use client";

export default function MessagesPage() {
	return (
		<div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden">
			{/* Main Container */}
			<div className="flex flex-1 overflow-hidden">
				{/* LEFT PANEL */}
				<div className="w-full md:w-2/5 lg:w-1/3 flex flex-col border-r border-gray-200 dark:border-gray-700/50 bg-background-light dark:bg-background-dark">
					{/* Top App Bar */}
					<div className="flex items-center p-4 pb-2 justify-between shrink-0">
						<div className="flex size-12 items-center">
							<span className="material-symbols-outlined text-gray-600 dark:text-gray-400 text-2xl">
								menu
							</span>
						</div>

						<h2 className="text-gray-900 dark:text-white text-lg font-bold flex-1 text-center">
							Messages
						</h2>

						<div className="flex w-12 items-center justify-end">
							<button className="h-12">
								<span className="material-symbols-outlined text-2xl text-gray-600 dark:text-gray-400">
									add_comment
								</span>
							</button>
						</div>
					</div>

					{/* Search */}
					<div className="px-4 py-3">
						<label className="flex flex-col h-12 w-full">
							<div className="flex items-stretch rounded-lg h-full">
								<div className="text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center pl-4 rounded-l-lg">
									<span className="material-symbols-outlined text-2xl">
										search
									</span>
								</div>
								<input
									className="flex-1 border-none bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-white px-4 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-r-lg focus:outline-none"
									placeholder="Search conversations"
								/>
							</div>
						</label>
					</div>

					{/* Conversation List */}
					<div className="flex-1 overflow-y-auto">
						{/* Active chat */}
						<div className="flex gap-4 bg-primary/20 dark:bg-primary/20 px-4 py-3 justify-between border-l-4 border-primary">
							<div className="flex gap-4">
								<div className="relative shrink-0">
									<div
										className="bg-center bg-cover rounded-full h-14 w-14"
										style={{
											backgroundImage:
												'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsgGWMY21rpxqsdgDNkCwjO121Ak_2C6D66fEgTDALG4eqQwbq0zNtYbDHR78yydpT6YrZ5y5M8ViNK3eHoxQHWtIQbwo8_UbSvP3u6wKvtsErBRCRNcxjxQCjuiyAIVilNWduA9CGUC5nASq2dYRW5swG_7obNS17ABtiLM4e0cQS00MpwtBtCol-Nx0t1Mz5WiywnPWckx-6BHO5ceXbXgrcDkftAYSmHtgSneLlORFRua1PRfQQ5Y1mnRzWvbbOEibRjGkDHMLE")',
										}}></div>
									<div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-primary/20"></div>
								</div>

								<div className="flex flex-col justify-center">
									<p className="text-gray-900 dark:text-white font-medium">
										Eleanor Pena
										<span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
											Client
										</span>
									</p>
									<p className="text-gray-800 dark:text-gray-200 text-sm truncate">
										Hey, I've just sent over the mockups.
									</p>
									<p className="text-gray-500 dark:text-gray-400 text-sm truncate">
										UX/UI Redesign for Mobile App
									</p>
								</div>
							</div>

							<div className="flex flex-col items-end">
								<p className="text-xs text-gray-500 dark:text-gray-400">
									2:45 PM
								</p>
								<div className="flex size-6 items-center justify-center bg-primary text-white rounded-full text-xs font-bold">
									2
								</div>
							</div>
						</div>

						{/* (Other list items remain unchanged—copy your HTML exactly and paste here as JSX) */}
					</div>
				</div>

				{/* RIGHT PANEL */}
				<div className="w-full md:w-3/5 lg:w-2/3 hidden md:flex flex-col bg-gray-50 dark:bg-gray-900/50">
					{/* Chat Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/50">
						<div className="flex items-center gap-4">
							<div className="relative">
								<div
									className="bg-center bg-cover rounded-full h-12 w-12"
									style={{
										backgroundImage:
											'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2gtQiJc25rUe363Vf2xBnZr5IhnLv24SfrwXNbh3zaWA4FQgzF1uDwKd2H8qYAycsQ4_j29jjcfVipQi42GY8VrktFFi2scz-HZkP8OpO8riRK3ybnxLopwrtKVrmTjmeqogs2qhbC1ur9sU2NeyMyJAnIrQFqRFTftEtBwWfNWTiQwuEHEWQ2D5k3ElLR9nV7wccZ91a1o0W858HFLbP61GfgdlTZJcyqWqPTp-LztOQxmFzEO4vFZp7663nkzfPu1kqqwWSsT8V")',
									}}></div>
								<div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-gray-50 dark:border-gray-900/50"></div>
							</div>

							<div>
								<p className="text-gray-900 dark:text-white font-semibold">
									Eleanor Pena
								</p>
								<p className="text-primary text-sm font-medium cursor-pointer">
									UX/UI Redesign for Mobile App
								</p>
							</div>
						</div>

						<button className="text-gray-500 dark:text-gray-400">
							<span className="material-symbols-outlined text-2xl">
								more_vert
							</span>
						</button>
					</div>

					{/* Messages Area */}
					<div className="flex-1 overflow-y-auto p-6 space-y-6">
						{/* Copy all your chat message UI here (converted to JSX) */}
					</div>

					{/* Message Composer */}
					<div className="p-4 border-t border-gray-200 dark:border-gray-700/50">
						<div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl px-2 py-1">
							<button className="p-2 text-gray-500 dark:text-gray-400">
								<span className="material-symbols-outlined text-2xl">
									add_photo_alternate
								</span>
							</button>

							<button className="p-2 text-gray-500 dark:text-gray-400">
								<span className="material-symbols-outlined text-2xl">
									attach_file
								</span>
							</button>

							<input
								className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
								placeholder="Type your message..."
							/>

							<button className="size-10 bg-primary text-white rounded-full flex items-center justify-center">
								<span className="material-symbols-outlined text-2xl">
									send
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
