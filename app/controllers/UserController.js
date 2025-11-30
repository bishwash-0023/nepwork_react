import api from "@/app/services/api";

/**
 * UserController - Updated to match new backend API structure
 *
 * Endpoints (from z_readmes/accounts.md):
 * - GET /auth/users/me/ - Get current authenticated user's profile
 * - PUT/PATCH /auth/users/me/ - Update current user's profile
 * - GET /auth/users/{id}/public/ - Get public details of a user
 * - GET /auth/users/ - List all users (admin only)
 */

// Helper: format date
const formatDate = (dateString) => {
	if (!dateString) return null;
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
};

// Helper: transform user data to match new backend User model
const transformUser = (u) => ({
	id: u.id,
	email: u.email,
	name: u.full_name || "",
	fullName: u.full_name,
	phoneNumber: u.phone_number,
	address: u.address,
	profileImage: u.profile_image,
	avatar: u.profile_image, // alias for compatibility
	isActive: u.is_active,
	isStaff: u.is_staff,
	isAdmin: u.is_admin,
	dateJoined: u.date_joined,
	joined: formatDate(u.date_joined),
});

// Helper: transform public user data (limited fields)
const transformPublicUser = (u) => ({
	id: u.id,
	fullName: u.full_name,
	name: u.full_name || "",
	address: u.address,
	profileImage: u.profile_image,
	avatar: u.profile_image, // alias for compatibility
});

export const userController = {
	/**
	 * Get public profile of a user
	 * NEW ENDPOINT: GET /auth/users/{id}/public/
	 */
	async getUser(id) {
		try {
			const { data } = await api.get(`/auth/users/${id}/public/`);
			return transformPublicUser(data);
		} catch (error) {
			console.error("Error fetching user:", error);
			return null;
		}
	},

	/**
	 * Get current authenticated user's full profile
	 * NEW ENDPOINT: GET /auth/users/me/
	 */
	async getCurrentUser() {
		try {
			const { data } = await api.get("/auth/users/me/");
			return transformUser(data);
		} catch (error) {
			console.error("Error fetching current user:", error);
			return null;
		}
	},

	/**
	 * Update current user's profile
	 * NEW ENDPOINT: PATCH /auth/users/me/
	 */
	async updateUser(updates) {
		try {
			const payload = {};

			// Map frontend fields to new backend fields
			if (updates.fullName !== undefined)
				payload.full_name = updates.fullName;
			if (updates.phoneNumber !== undefined)
				payload.phone_number = updates.phoneNumber;
			if (updates.address !== undefined)
				payload.address = updates.address;

			// Handle profile image - may need multipart form data
			if (updates.profileImage !== undefined) {
				// If it's a File object, we need to use FormData
				if (updates.profileImage instanceof File) {
					const formData = new FormData();
					Object.keys(payload).forEach((key) => {
						formData.append(key, payload[key]);
					});
					formData.append("profile_image", updates.profileImage);

					const { data } = await api.patch(
						"/auth/users/me/",
						formData,
						{
							headers: { "Content-Type": "multipart/form-data" },
						}
					);
					return { success: true, user: transformUser(data) };
				} else {
					payload.profile_image = updates.profileImage;
				}
			}

			const { data } = await api.patch("/auth/users/me/", payload);
			return { success: true, user: transformUser(data) };
		} catch (error) {
			console.error("Error updating user:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Update failed",
			};
		}
	},

	/**
	 * List all users (admin only)
	 * NEW ENDPOINT: GET /auth/users/
	 */
	async getUsers(filters = {}) {
		try {
			const params = {};
			if (filters.page) params.page = filters.page;

			const { data } = await api.get("/auth/users/", { params });
			const users = data.results || data;
			return {
				count: data.count || users.length,
				results: Array.isArray(users) ? users.map(transformUser) : [],
			};
		} catch (error) {
			console.error("Error fetching users:", error);
			return { count: 0, results: [] };
		}
	},
};
