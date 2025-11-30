import AuthService from "@/app/services/auth/auth_service";
import BackendResponse from "@/app/services/backend_response";

export const authController = {
	/**
	 * Login with email and password
	 * Uses new backend endpoint: POST /auth/login/
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<{ success: boolean, user?: Object, message?: string }>}
	 */
	async login(email, password) {
		const loginResponse = await AuthService.login(email, password);

		if (!loginResponse.success) {
			return {
				success: false,
				message: loginResponse.error?.message || "Invalid credentials",
			};
		}

		// The new backend returns user data along with tokens
		// Response format: { tokens: { access, refresh }, user: {...} }
		if (loginResponse.response?.user) {
			return {
				success: true,
				user: AuthService.transformUser(loginResponse.response.user),
			};
		}

		// Fallback: fetch user profile if not included in login response
		const userResponse = await AuthService.fetchCurrentUser();

		if (!userResponse.success) {
			return {
				success: false,
				message: "Login successful but failed to fetch user profile",
			};
		}

		return {
			success: true,
			user: AuthService.transformUser(userResponse.response),
		};
	},

	/**
	 * Register a new user
	 * Uses new backend endpoint: POST /auth/signup/
	 * @param {Object} params - { email, password, passwordConfirm, fullName, phoneNumber, address }
	 * @returns {Promise<{ success: boolean, user?: Object, message?: string }>}
	 */
	async signup({
		email,
		password,
		passwordConfirm,
		fullName,
		phoneNumber,
		address,
	}) {
		const signupResponse = await AuthService.signup({
			email,
			password,
			passwordConfirm: passwordConfirm || password,
			fullName,
			phoneNumber,
			address,
		});

		if (!signupResponse.success) {
			// Handle specific error messages from backend
			const errorData = signupResponse.error?.details;
			let message = signupResponse.error?.message || "Signup failed";

			// Check for specific field errors
			if (errorData?.email?.[0]) {
				message = errorData.email[0];
			} else if (errorData?.password?.[0]) {
				message = errorData.password[0];
			} else if (errorData?.password_confirm?.[0]) {
				message = errorData.password_confirm[0];
			}

			return { success: false, message };
		}

		// Auto-login after successful signup
		return await this.login(email, password);
	},

	/**
	 * Fetch current user profile
	 * @returns {Promise<Object|null>}
	 */
	async fetchCurrentUser() {
		const response = await AuthService.fetchCurrentUser();

		if (!response.success) {
			return null;
		}

		return AuthService.transformUser(response.response);
	},

	/**
	 * Complete user onboarding
	 * @param {Object} details - { bio, location, title, skills, hourlyRate }
	 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
	 */
	async completeOnboarding(details) {
		const response = await AuthService.completeOnboarding({
			bio: details.bio,
			location: details.location,
			title: details.title,
			skills: details.skills,
			hourlyRate: details.hourlyRate,
		});

		if (!response.success) {
			return {
				success: false,
				error:
					response.error?.message || "Failed to complete onboarding",
			};
		}

		return {
			success: true,
			user: AuthService.transformUser(response.response),
		};
	},

	/**
	 * Update user profile
	 * @param {Object} updates
	 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
	 */
	async updateProfile(updates) {
		const response = await AuthService.updateProfile(updates);

		if (!response.success) {
			return {
				success: false,
				error: response.error?.message || "Update failed",
			};
		}

		return {
			success: true,
			user: AuthService.transformUser(response.response),
		};
	},

	/**
	 * Refresh access token
	 * @returns {Promise<boolean>}
	 */
	async refreshToken() {
		const response = await AuthService.refreshToken();
		return response.success;
	},

	/**
	 * Logout user
	 */
	logout() {
		AuthService.logout();
		if (typeof window !== "undefined") {
			window.location.href = "/login";
		}
	},

	/**
	 * Check if user is authenticated
	 * @returns {boolean}
	 */
	isAuthenticated() {
		return AuthService.isAuthenticated();
	},

	/**
	 * Get cached user from storage
	 * @returns {Object|null}
	 */
	getUser() {
		return AuthService.getStoredUser();
	},

	/**
	 * Get current access token
	 * @returns {string|null}
	 */
	getToken() {
		return AuthService.getAccessToken();
	},
};
