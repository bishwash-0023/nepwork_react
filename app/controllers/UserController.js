import api from "@/app/services/api";

// Helper: transform user data
const transformUser = (u) => ({
	id: u.id,
	email: u.email,
	name: u.full_name || `${u.first_name || ""} ${u.last_name || ""}`.trim(),
	fullName: u.full_name,
	firstName: u.first_name,
	lastName: u.last_name,
	role: u.role,
	title: u.title,
	avatar: u.avatar,
	bio: u.bio,
	location: u.location,
	skills: u.skills || [],
	hourlyRate: u.hourly_rate,
	rating: u.rating,
	reviews: u.reviews_count || 0,
	onboardingCompleted: u.onboarding_completed,
	dateJoined: u.date_joined,
	joined: u.date_joined
		? new Date(u.date_joined).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric",
			})
		: null,
	jobsCompleted: u.jobs_completed,
	jobsPosted: u.jobs_posted,
	totalSpent: u.total_spent,
	isActive: u.is_active,
});

export const userController = {
	// Get public profile
	async getUser(id) {
		try {
			const { data } = await api.get(`/api/users/${id}/`);
			return transformUser(data);
		} catch {
			return null;
		}
	},

	// Get current user
	async getCurrentUser() {
		try {
			const { data } = await api.get("/api/users/me/");
			return transformUser(data);
		} catch {
			return null;
		}
	},

	// Update current user
	async updateUser(updates) {
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
			if (updates.onboardingCompleted !== undefined)
				payload.onboarding_completed = updates.onboardingCompleted;

			const { data } = await api.patch("/api/users/me/", payload);
			return { success: true, user: transformUser(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Update failed",
			};
		}
	},

	// Search users
	async searchUsers(filters = {}) {
		try {
			const params = {};
			if (filters.search) params.search = filters.search;
			if (filters.skills) params.skills = filters.skills;
			if (filters.role) params.role = filters.role;
			if (filters.page) params.page = filters.page;

			const { data } = await api.get("/api/users/", { params });
			const users = data.results || data;
			return {
				count: data.count || users.length,
				results: users.map(transformUser),
			};
		} catch {
			return { count: 0, results: [] };
		}
	},
};
