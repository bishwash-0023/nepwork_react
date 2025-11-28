"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { userController } from "@/app/controllers/UserController";
import { authController } from "@/app/controllers/AuthController";
import { messageController } from "@/app/controllers/MessageController";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage({ params }) {
	const [user, setUser] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isOwnProfile, setIsOwnProfile] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const resolvedParams = await params;
				const id = resolvedParams.id;

				// Fetch current logged-in user
				const loggedInUser = await authController.fetchCurrentUser();
				setCurrentUser(loggedInUser);

				if (id) {
					// Check if viewing own profile
					if (
						id === "me" ||
						(loggedInUser && id == loggedInUser.id)
					) {
						setUser(loggedInUser);
						setIsOwnProfile(true);
					} else {
						const userData = await userController.getUser(id);
						setUser(userData);
						setIsOwnProfile(false);
					}
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [params]);

	const handleStartConversation = async () => {
		if (!user || !currentUser) return;
		try {
			const result = await messageController.startConversation(user.id);
			if (result.success) {
				router.push("/messages");
			}
		} catch (error) {
			console.error("Error starting conversation:", error);
		}
	};

	if (loading)
		return (
			<DashboardLayout>
				<div className='flex items-center justify-center min-h-screen'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
				</div>
			</DashboardLayout>
		);

	if (!user)
		return (
			<DashboardLayout>
				<div className='flex items-center justify-center min-h-screen'>
					<p>User not found</p>
				</div>
			</DashboardLayout>
		);

	// Get display values with fallbacks
	const displayName = user.fullName || user.username || "Unknown User";
	const displayTitle = user.title || user.role || "User";
	const displayAvatar =
		user.avatar ||
		`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
	const displayLocation = user.location || "Not specified";
	const displayJoined = user.dateJoined
		? new Date(user.dateJoined).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric",
			})
		: "Unknown";
	const displayBio = user.bio || "No bio provided yet.";
	const displaySkills = user.skills || [];
	const displayRating = user.rating || "N/A";
	const displayReviews = user.reviewCount || user.reviews || 0;

	return (
		<DashboardLayout>
			<div className='min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8'>
				<div className='max-w-5xl mx-auto'>
					{/* Profile Header */}
					<div className='bg-white dark:bg-[#192430] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm mb-6 relative overflow-hidden'>
						<div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10'></div>
						<div className='relative flex flex-col md:flex-row items-start gap-6 pt-10'>
							<img
								src={displayAvatar}
								alt={displayName}
								className='w-32 h-32 rounded-full border-4 border-white dark:border-[#192430] shadow-lg object-cover'
							/>
							<div className='flex-1 mt-2'>
								<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
									<div>
										<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
											{displayName}
										</h1>
										<p className='text-lg text-gray-500 dark:text-gray-400 font-medium capitalize'>
											{displayTitle}
										</p>
										<div className='flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400'>
											<span className='flex items-center gap-1'>
												<span className='material-symbols-outlined text-lg'>
													location_on
												</span>
												{displayLocation}
											</span>
											<span className='flex items-center gap-1'>
												<span className='material-symbols-outlined text-lg'>
													calendar_month
												</span>
												Joined {displayJoined}
											</span>
										</div>
									</div>
									<div className='flex gap-3'>
										{isOwnProfile ? (
											<Link href='/profile'>
												<button className='px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20'>
													Edit Profile
												</button>
											</Link>
										) : (
											<>
												{user.role === "freelancer" && (
													<button className='px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20'>
														Hire Me
													</button>
												)}
												<button
													onClick={
														handleStartConversation
													}
													className='px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
												>
													Message
												</button>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{/* Left Column */}
						<div className='md:col-span-2 space-y-6'>
							{/* About */}
							<div className='bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
								<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
									About Me
								</h2>
								<p className='text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line'>
									{displayBio}
								</p>
							</div>

							{/* Reviews */}
							<div className='bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
								<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
									Reviews ({displayReviews})
								</h2>
								<div className='space-y-4'>
									{displayReviews === 0 ? (
										<p className='text-gray-500 dark:text-gray-400'>
											No reviews yet.
										</p>
									) : (
										<>
											{/* Review items would come from API */}
											<div className='border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0'>
												<div className='flex justify-between mb-2'>
													<h4 className='font-bold text-gray-900 dark:text-white'>
														Great work!
													</h4>
													<div className='flex text-yellow-500 text-sm'>
														{[1, 2, 3, 4, 5].map(
															(i) => (
																<span
																	key={i}
																	className='material-symbols-outlined text-base'
																	style={{
																		fontVariationSettings:
																			"'FILL' 1",
																	}}
																>
																	star
																</span>
															)
														)}
													</div>
												</div>
												<p className='text-gray-600 dark:text-gray-400 text-sm'>
													"Delivered the project on
													time and exceeded
													expectations. Highly
													recommended."
												</p>
												<p className='text-xs text-gray-400 mt-2'>
													2 weeks ago
												</p>
											</div>
										</>
									)}
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className='space-y-6'>
							{/* Stats */}
							<div className='bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
								<h3 className='font-bold text-gray-900 dark:text-white mb-4'>
									Stats
								</h3>
								<div className='space-y-4'>
									<div className='flex justify-between items-center'>
										<span className='text-gray-500 dark:text-gray-400'>
											Rating
										</span>
										<span className='font-bold text-gray-900 dark:text-white flex items-center gap-1'>
											<span
												className='material-symbols-outlined text-yellow-500 text-base'
												style={{
													fontVariationSettings:
														"'FILL' 1",
												}}
											>
												star
											</span>
											{displayRating}
										</span>
									</div>
									{user.hourlyRate && (
										<div className='flex justify-between items-center'>
											<span className='text-gray-500 dark:text-gray-400'>
												Hourly Rate
											</span>
											<span className='font-bold text-gray-900 dark:text-white'>
												${user.hourlyRate}/hr
											</span>
										</div>
									)}
									{user.jobsCompleted !== undefined && (
										<div className='flex justify-between items-center'>
											<span className='text-gray-500 dark:text-gray-400'>
												Jobs Completed
											</span>
											<span className='font-bold text-gray-900 dark:text-white'>
												{user.jobsCompleted || 0}
											</span>
										</div>
									)}
									{user.totalSpent && (
										<div className='flex justify-between items-center'>
											<span className='text-gray-500 dark:text-gray-400'>
												Total Spent
											</span>
											<span className='font-bold text-gray-900 dark:text-white'>
												${user.totalSpent}
											</span>
										</div>
									)}
								</div>
							</div>

							{/* Skills */}
							<div className='bg-white dark:bg-[#192430] rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
								<h3 className='font-bold text-gray-900 dark:text-white mb-4'>
									Skills
								</h3>
								<div className='flex flex-wrap gap-2'>
									{displaySkills.length === 0 ? (
										<p className='text-gray-500 dark:text-gray-400'>
											No skills added yet.
										</p>
									) : (
										displaySkills.map((skill, index) => (
											<span
												key={index}
												className='px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium'
											>
												{skill}
											</span>
										))
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
