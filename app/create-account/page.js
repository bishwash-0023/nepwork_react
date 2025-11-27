"use client";

export default function CreateAccount() {
	return (
		<div className="dark font-display">
			<div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-background-dark via-[#0D152B] to-background-dark p-4 font-display">
				{/* Background blur balls */}
				<div className="absolute top-0 left-0 h-full w-full overflow-hidden">
					<div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl"></div>
					<div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl"></div>
				</div>

				<main className="relative z-10 flex w-full max-w-md flex-col items-center">
					{/* Logo */}
					<div className="flex items-center justify-center gap-2 pb-6">
						<span className="material-symbols-outlined text-4xl text-primary">
							work
						</span>
						<span className="text-2xl font-bold tracking-wider text-[#F5F5F5]">
							Freelancer
						</span>
					</div>

					<h1 className="text-[#F5F5F5] text-[32px] font-bold leading-tight px-4 text-center pb-8 pt-2">
						Create Your Account
					</h1>

					{/* Upload section */}
					<div className="flex w-full flex-col gap-4 items-center mb-6">
						<div className="relative">
							<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-2 border-dashed border-primary/40 flex items-center justify-center">
								<span className="material-symbols-outlined text-4xl text-primary/60">
									add_a_photo
								</span>
							</div>
						</div>

						<button className="flex min-w-[84px] items-center justify-center h-10 px-4 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
							Upload a photo
						</button>
					</div>

					{/* Form */}
					<form className="w-full flex flex-col gap-4">
						{/* Full Name */}
						<div className="flex w-full flex-col">
							<label className="flex flex-col">
								<p className="text-[#F5F5F5] text-base font-medium pb-2">
									Full Name
								</p>
								<input
									className="form-input glassmorphism w-full rounded-lg text-[#F5F5F5] h-14 p-4 text-base focus:outline-0 focus:ring-2 focus:ring-primary"
									placeholder="Enter your full name"
								/>
							</label>
						</div>

						{/* Email */}
						<div className="flex w-full flex-col">
							<label className="flex flex-col">
								<p className="text-[#F5F5F5] text-base font-medium pb-2">
									Email Address
								</p>
								<input
									type="email"
									className="form-input glassmorphism w-full rounded-lg text-[#F5F5F5] h-14 p-4 text-base focus:outline-0 focus:ring-2 focus:ring-primary"
									placeholder="Enter your email address"
								/>
							</label>
						</div>

						{/* Phone */}
						<div className="flex w-full flex-col">
							<label className="flex flex-col">
								<p className="text-[#F5F5F5] text-base font-medium pb-2">
									Phone Number
								</p>
								<input
									type="tel"
									className="form-input glassmorphism w-full rounded-lg text-[#F5F5F5] h-14 p-4 text-base focus:outline-0 focus:ring-2 focus:ring-primary"
									placeholder="Enter your phone number"
								/>
							</label>
						</div>

						{/* Address */}
						<div className="flex w-full flex-col">
							<label className="flex flex-col">
								<p className="text-[#F5F5F5] text-base font-medium pb-2">
									Address
								</p>
								<input
									className="form-input glassmorphism w-full rounded-lg text-[#F5F5F5] h-14 p-4 text-base focus:outline-0 focus:ring-2 focus:ring-primary"
									placeholder="Enter your address"
								/>
							</label>
						</div>

						{/* Submit button */}
						<div className="pt-6 pb-4">
							<button className="flex w-full items-center justify-center h-14 px-4 rounded-lg bg-primary text-white text-lg font-bold tracking-wide transition-transform hover:scale-105 active:scale-100">
								Sign Up
							</button>
						</div>
					</form>

					{/* Login link */}
					<div className="text-center">
						<a
							className="text-sm text-[#F5F5F5]/70 hover:text-primary transition-colors"
							href="#">
							Already have an account?{" "}
							<span className="font-bold text-[#F5F5F5] hover:text-primary">
								Log In
							</span>
						</a>
					</div>
				</main>
			</div>

			{/* Inline Styles for glassmorphism */}
			<style jsx>{`
				.glassmorphism {
					background: rgba(255, 255, 255, 0.05);
					backdrop-filter: blur(10px);
					-webkit-backdrop-filter: blur(10px);
					border: 1px solid rgba(59, 130, 246, 0.2);
				}
			`}</style>
		</div>
	);
}
