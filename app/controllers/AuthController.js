import api, { setTokens, clearTokens, getToken } from "@/app/services/api";

const USER_KEY = "nepwork_user";

// Helper to transform user data from backend
function transformUser(data) {
	return {
		id: data.id,
		email: data.email,
		name:
			data.full_name ||
			`${data.first_name || ""} ${data.last_name || ""}`.trim(),
		firstName: data.first_name,
		lastName: data.last_name,
		role: data.role,
		avatar: data.avatar,
		bio: data.bio,
		location: data.location,
		title: data.title,
		skills: data.skills || [],
		hourlyRate: data.hourly_rate,
		onboardingCompleted: data.onboarding_completed,
		dateJoined: data.date_joined,
	};
}

// Store/retrieve user from localStorage
function getStoredUser() {
	if (typeof window === "undefined") return null;
	const data = localStorage.getItem(USER_KEY);
	return data ? JSON.parse(data) : null;
}

function storeUser(user) {
	if (typeof window !== "undefined") {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	}
}

function clearUser() {
	if (typeof window !== "undefined") {
		localStorage.removeItem(USER_KEY);
	}
}

export const authController = {
	// Login
	async login(email, password) {
		try {
			const { data: tokens } = await api.post("/auth/jwt/create/", {
				email,
				password,
			});
			setTokens(tokens.access, tokens.refresh);
			const user = await this.fetchCurrentUser();
			return { success: true, user };
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.detail || "Invalid credentials",
			};
		}
	},

	// Signup
	async signup({ email, password, firstName, lastName, role }) {
		try {
			await api.post("/auth/users/", {
				email,
				password,
				first_name: firstName || "",
				last_name: lastName || "",
				role: role === "hire" ? "client" : "freelancer",
			});
			return await this.login(email, password);
		} catch (error) {
			return {
				success: false,
				message:
					error.response?.data?.email?.[0] ||
					error.response?.data?.detail ||
					"Signup failed",
			};
		}
	},

	// Fetch current user
	async fetchCurrentUser() {
		try {
			const { data } = await api.get("/api/users/me/");
			const user = transformUser(data);
			storeUser(user);
			return user;
		} catch {
			return null;
		}
	},

	// Complete onboarding
	async completeOnboarding(details) {
		try {
			const { data } = await api.patch("/api/users/me/", {
				bio: details.bio,
				location: details.location,
				title: details.title,
				skills: details.skills,
				hourly_rate: details.hourlyRate,
				onboarding_completed: true,
			});
			const user = transformUser(data);
			storeUser(user);
			return { success: true, user };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Update failed",
			};
		}
	},

	// Update profile
	async updateProfile(updates) {
		try {
			const payload = {};
			if (updates.firstName !== undefined)
				payload.first_name = updates.firstName;
			if (updates.lastName !== undefined)
				payload.last_name = updates.lastName;
			if (updates.bio !== undefined) payload.bio = updates.bio;
			if (updates.location !== undefined)
				payload.location = updates.location;
			if (updates.title !== undefined) payload.title = updates.title;
			if (updates.skills !== undefined) payload.skills = updates.skills;
			if (updates.hourlyRate !== undefined)
				payload.hourly_rate = updates.hourlyRate;
			if (updates.avatar !== undefined) payload.avatar = updates.avatar;

			const { data } = await api.patch("/api/users/me/", payload);
			const user = transformUser(data);
			storeUser(user);
			return { success: true, user };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Update failed",
			};
		}
	},

	// Logout
	logout() {
		clearTokens();
		clearUser();
		if (typeof window !== "undefined") window.location.href = "/login";
	},

	// Check auth status
	isAuthenticated: () => !!getToken(),

	// Get cached user
	getUser: getStoredUser,
};
