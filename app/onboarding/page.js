"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authController } from "@/app/controllers/AuthController";

export default function Onboarding() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		phone: "",
		location: "",
		bio: "",
		skills: "",
		hourlyRate: "",
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const result = await authController.completeOnboarding({
				phone: formData.phone,
				location: formData.location,
				bio: formData.bio,
				skills: formData.skills
					.split(",")
					.map((s) => s.trim())
					.filter((s) => s),
				hourlyRate: formData.hourlyRate
					? parseFloat(formData.hourlyRate)
					: null,
			});

			if (result.success) {
				router.push("/dashboard");
			} else {
				setError(result.error || "Failed to save details");
			}
		} catch (error) {
			console.error("Onboarding error:", error);
			setError("Failed to save details. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-display'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
					Complete Your Profile
				</h2>
				<p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
					We need a few more details to get you started.
				</p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white dark:bg-[#192430] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700'>
					{error && (
						<div className='mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm'>
							{error}
						</div>
					)}
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Phone Number
							</label>
							<div className='mt-1'>
								<input
									id='phone'
									name='phone'
									type='tel'
									className='appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white'
									value={formData.phone}
									onChange={(e) =>
										setFormData({
											...formData,
											phone: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='location'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Location
							</label>
							<div className='mt-1'>
								<input
									id='location'
									name='location'
									type='text'
									placeholder='City, Country'
									className='appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white'
									value={formData.location}
									onChange={(e) =>
										setFormData({
											...formData,
											location: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='skills'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Skills (comma separated)
							</label>
							<div className='mt-1'>
								<input
									id='skills'
									name='skills'
									type='text'
									placeholder='React, Node.js, Python'
									className='appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white'
									value={formData.skills}
									onChange={(e) =>
										setFormData({
											...formData,
											skills: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='hourlyRate'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Hourly Rate ($)
							</label>
							<div className='mt-1'>
								<input
									id='hourlyRate'
									name='hourlyRate'
									type='number'
									placeholder='50'
									className='appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white'
									value={formData.hourlyRate}
									onChange={(e) =>
										setFormData({
											...formData,
											hourlyRate: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='bio'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Short Bio
							</label>
							<div className='mt-1'>
								<textarea
									id='bio'
									name='bio'
									rows='3'
									className='appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white'
									value={formData.bio}
									onChange={(e) =>
										setFormData({
											...formData,
											bio: e.target.value,
										})
									}
									placeholder='Tell us a bit about yourself...'
								></textarea>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={loading}
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors'
							>
								{loading ? "Saving..." : "Save & Continue"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
