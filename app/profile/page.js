"use client";

import React from "react";
import "./profile.css"; // Custom styles moved here

export default function ProfilePage() {
	return (
		<div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen flex flex-col">
			{/* Top Bar */}
			<header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 p-4 backdrop-blur-sm dark:bg-background-dark/80">
				<button className="flex size-10 shrink-0 items-center justify-center rounded-full">
					<span className="material-symbols-outlined text-text-light dark:text-text-dark">
						arrow_back
					</span>
				</button>

				<button className="flex h-10 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-card-light px-4 text-sm font-bold shadow-sm dark:bg-card-dark">
					<span className="material-symbols-outlined text-primary text-base">
						edit
					</span>
					<span className="truncate text-text-light dark:text-text-dark">
						Edit
					</span>
				</button>
			</header>

			<main className="flex flex-col gap-5 pb-10">
				{/* Profile Header */}
				<section className="flex p-4 @container">
					<div className="flex w-full flex-col items-center gap-4">
						<div className="flex flex-col items-center gap-4">
							<div
								className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-card-light dark:border-card-dark"
								style={{
									backgroundImage:
										"url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-1T2WWbjryfsn9M5IVGeCqgqh2d4LrlVdLAywQDjFPp_wndzuvtHMrytxTxTg6XR6B7FqeeaTIT5ZcaDQ3vsw2BaA4YKxSXGj0bIl4z2UPBMM6Jz5AM0_ZmN30pRjrxHF7o4eb5XaF3xee8x2o2YlBHjpp9QXGyKMAosNK9JSlEfs8l-aKf1lmXt4YUTXZyzTkdkwTntVrMqQs28HKS-aE08bwKg9LGyXUoRuD2rwegMx_qbqERvnN0naIwmgkYOCT1nCxLvwSu6g')",
								}}></div>

							<div className="flex flex-col items-center justify-center">
								<p className="text-[22px] font-bold leading-tight text-center">
									Jane Doe
								</p>
								<p className="text-base text-text-light/70 dark:text-text-dark/70">
									Senior UI/UX Designer
								</p>
							</div>
						</div>

						<button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold w-full max-w-[480px] @[480px]:w-auto">
							Invite to Job
						</button>
					</div>
				</section>

				{/* Stats */}
				<section className="flex flex-wrap gap-4 px-4">
					{[
						{ label: "Hourly Rate", value: "$85" },
						{ label: "Jobs Completed", value: "42" },
						{ label: "Rating", value: "4.9", star: true },
					].map((item, i) => (
						<div
							key={i}
							className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
							<p className="text-sm text-text-light/70 dark:text-text-dark/70">
								{item.label}
							</p>

							{item.star ? (
								<div className="flex items-center gap-1">
									<p className="text-2xl font-bold">
										{item.value}
									</p>
									<span
										className="material-symbols-outlined text-secondary text-xl"
										style={{
											fontVariationSettings: "'FILL' 1",
										}}>
										star
									</span>
								</div>
							) : (
								<p className="text-2xl font-bold">
									{item.value}
								</p>
							)}
						</div>
					))}
				</section>

				{/* About */}
				<section>
					<h2 className="section-title px-4">About</h2>
					<p className="px-4 text-base leading-normal text-text-light/90 dark:text-text-dark/90">
						A passionate UI/UX designer with over 8 years of
						experience in creating delightful and user-centric
						digital products...
					</p>
				</section>

				{/* Skills */}
				<section>
					<h2 className="section-title px-4">Skills</h2>

					<div className="flex flex-wrap gap-2 px-4">
						{[
							"Figma",
							"UI Design",
							"Prototyping",
							"UX Research",
							"Webflow",
							"Mobile Apps",
						].map((s, i) => (
							<span key={i} className="skill-pill">
								{s}
							</span>
						))}
					</div>
				</section>

				{/* Portfolio */}
				<section>
					<h2 className="section-title px-4">Portfolio</h2>

					<div className="horizontal-scroll px-4">
						{[
							{
								title: "Fintech App Redesign",
								img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrigQYlNUuTq1tirHBPZA3jYy9yuxVImaUlj_ha_tmEid4ZaSRWGvVShLaNsTRvJ0k_TwTclSYM9zMN_ZuHPgS34eRNgUksWDxi3BRJw5raYzwMYk65LEckYV_tOPMJRblnRCqvF5oHl2oEOgkZ4xe00OE_BG8XEMV9QFBxJr3dRlRpvBkxA9MEeAunHXZHdV6vSdOXgf96i0Z2whBU2mjuWoyoncwAy-2HaLsOm1NRnD7xAVrBjrW8pKQMXuAJy1xOzg9inE2CUKq",
							},
							{
								title: "SaaS Platform UI Kit",
								img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA52ykpyYa_tc3T1OqMfheZXPAHstCr7RT0KKEMWSchACNV17rYt0_I0zSNLKCVP8_tQJazrZEFNjgdObWUxl8r2H2GOvMeb9NJxG6v7x5hy41mWUUcgjdOo-Ddo4wdzIhJRMfI_2iuio1dRgpczNl3R9WgvASdDqh9xJvxuhBr58q0H6IEX6JQZlOSUkiGghrdNKZCf9CyFrTE0-ttnpMv2l-lih23P3KEHsxCyxDX5_Jx7zWla6zXm9ypg2GzDtWBrzfNRe4GZTjM",
							},
						].map((item, i) => (
							<div
								key={i}
								className="w-64 flex-shrink-0 flex-col gap-2 flex">
								<div
									className="aspect-[4/3] w-full rounded-xl bg-cover bg-center"
									style={{
										backgroundImage: `url('${item.img}')`,
									}}></div>
								<p className="font-semibold">{item.title}</p>
							</div>
						))}
					</div>
				</section>

				{/* Reviews */}
				<section>
					<h2 className="section-title px-4">Client Reviews</h2>

					<div className="horizontal-scroll px-4">
						{[
							{
								quote: '"Jane is an exceptional designer. Her attention to detail and creative vision transformed our project."',
								by: "John Smith",
							},
							{
								quote: '"Working with Jane was a breeze. She delivered high-quality work ahead of schedule. Highly recommended!"',
								by: "Sarah Lee",
							},
						].map((review, i) => (
							<div
								key={i}
								className="w-80 flex-shrink-0 rounded-xl border border-border-light dark:border-border-dark bg-card-light p-4 dark:bg-card-dark">
								<div className="flex items-center gap-1 pb-2">
									{Array(5)
										.fill(0)
										.map((_, i) => (
											<span
												key={i}
												className="material-symbols-outlined text-secondary"
												style={{
													fontVariationSettings:
														"'FILL' 1",
												}}>
												star
											</span>
										))}
								</div>

								<p className="text-sm italic">{review.quote}</p>
								<p className="pt-3 text-sm font-bold">
									- {review.by}
								</p>
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
