import { cookieService } from "../cookie_services";
import ApiService from "../api_service";
import BackendResponse from "../backend_response";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Token Storage using cookies for SSR compatibility
class TokenStorage {
	static ACCESS_TOKEN_KEY = "nepwork_access_token";
	static REFRESH_TOKEN_KEY = "nepwork_refresh_token";
	static USER_KEY = "nepwork_user";

	static getTokens() {
		return {
			access: cookieService.getCookie(this.ACCESS_TOKEN_KEY),
			refresh: cookieService.getCookie(this.REFRESH_TOKEN_KEY),
		};
	}

	static setTokens(access, refresh) {
		if (access) {
			cookieService.setCookie(this.ACCESS_TOKEN_KEY, access, 1); // 1 day for access
		}
		if (refresh) {
			cookieService.setCookie(this.REFRESH_TOKEN_KEY, refresh, 7); // 7 days for refresh
		}
	}

	static getAccessToken() {
		return cookieService.getCookie(this.ACCESS_TOKEN_KEY);
	}

	static getRefreshToken() {
		return cookieService.getCookie(this.REFRESH_TOKEN_KEY);
	}

	static clearTokens() {
		cookieService.deleteCookie(this.ACCESS_TOKEN_KEY);
		cookieService.deleteCookie(this.REFRESH_TOKEN_KEY);
	}

	static hasTokens() {
		return (
			cookieService.containsCookie(this.ACCESS_TOKEN_KEY) &&
			cookieService.containsCookie(this.REFRESH_TOKEN_KEY)
		);
	}

	static hasAccessToken() {
		return cookieService.containsCookie(this.ACCESS_TOKEN_KEY);
	}

	static hasRefreshToken() {
		return cookieService.containsCookie(this.REFRESH_TOKEN_KEY);
	}

	// User storage in localStorage
	static getStoredUser() {
		if (typeof window === "undefined") return null;
		try {
			const data = localStorage.getItem(this.USER_KEY);
			return data ? JSON.parse(data) : null;
		} catch {
			return null;
		}
	}

	static storeUser(user) {
		if (typeof window !== "undefined" && user) {
			localStorage.setItem(this.USER_KEY, JSON.stringify(user));
		}
	}

	static clearUser() {
		if (typeof window !== "undefined") {
			localStorage.removeItem(this.USER_KEY);
		}
	}
}

class AuthService {
	static instance = null;

	constructor() {
		this.apiService = ApiService.init();
	}

	static init() {
		if (AuthService.instance == null) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	/**
	 * Get the current access token for authenticated requests
	 * @returns {string|null}
	 */
	getApiAccessToken() {
		return TokenStorage.getAccessToken();
	}

	/**
	 * Login with email and password
	 * NEW ENDPOINT: POST /auth/login/
	 * Response: { tokens: { access, refresh }, user: {...} }
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<BackendResponse>}
	 */
	async login(email, password) {
		const response = await this.apiService.sendPostRequest("/auth/login/", {
			data: { email, password },
		});

		if (response.success && response.response) {
			// New backend returns tokens nested in 'tokens' object
			const { tokens, user } = response.response;
			if (tokens) {
				TokenStorage.setTokens(tokens.access, tokens.refresh);
			} else {
				// Fallback for old format
				const { access, refresh } = response.response;
				TokenStorage.setTokens(access, refresh);
			}

			// Store user if returned in login response
			if (user) {
				const transformedUser = this.transformUser(user);
				TokenStorage.storeUser(transformedUser);
			}
		}

		return response;
	}

	/**
	 * Register a new user
	 * NEW ENDPOINT: POST /auth/signup/
	 * @param {Object} userDetails - { email, password, passwordConfirm, fullName, phoneNumber, address }
	 * @returns {Promise<BackendResponse>}
	 */
	async signup(userDetails) {
		const validation = this.validateUserDetails(userDetails);
		if (!validation.valid) {
			return new BackendResponse({
				success: false,
				error: {
					message: validation.message,
					details: validation.errors,
				},
			});
		}

		const {
			email,
			password,
			passwordConfirm,
			fullName,
			phoneNumber,
			address,
		} = userDetails;

		const response = await this.apiService.sendPostRequest(
			"/auth/signup/",
			{
				data: {
					email,
					password,
					password_confirm: passwordConfirm || password,
					full_name: fullName || "",
					phone_number: phoneNumber || "",
					address: address || "",
				},
			}
		);

		return response;
	}

	/**
	 * Validate user details before signup
	 * @param {Object} userDetails
	 * @returns {{ valid: boolean, message?: string, errors?: string[] }}
	 */
	validateUserDetails(userDetails) {
		const errors = [];
		const { email, password, passwordConfirm } = userDetails;

		if (!email) errors.push("Email is required");
		if (!password) errors.push("Password is required");

		if (password && password.length < 8) {
			errors.push("Password must be at least 8 characters");
		}

		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.push("Invalid email format");
		}

		if (passwordConfirm && password !== passwordConfirm) {
			errors.push("Passwords do not match");
		}

		return {
			valid: errors.length === 0,
			message: errors.length > 0 ? errors[0] : null,
			errors,
		};
	}

	/**
	 * Refresh the access token using refresh token
	 * NEW ENDPOINT: POST /auth/jwt/refresh/
	 * @returns {Promise<BackendResponse>}
	 */
	async refreshToken() {
		const refresh = TokenStorage.getRefreshToken();

		if (!refresh) {
			return new BackendResponse({
				success: false,
				error: { message: "No refresh token available" },
			});
		}

		const response = await this.apiService.sendPostRequest(
			"/auth/jwt/refresh/",
			{
				data: { refresh },
			}
		);

		if (response.success && response.response?.access) {
			// New response format may include both access and refresh
			TokenStorage.setTokens(
				response.response.access,
				response.response.refresh || null
			);
		}

		return response;
	}

	/**
	 * Fetch current user profile
	 * NEW ENDPOINT: GET /auth/users/me/
	 * @returns {Promise<BackendResponse>}
	 */
	async fetchCurrentUser() {
		const response = await this.apiService.sendGetRequest(
			"/auth/users/me/",
			{
				auth: true,
			}
		);

		if (response.success && response.response) {
			const user = this.transformUser(response.response);
			TokenStorage.storeUser(user);
		}

		return response;
	}

	/**
	 * Update current user profile
	 * NEW ENDPOINT: PUT/PATCH /auth/users/me/
	 * @param {Object} updates
	 * @returns {Promise<BackendResponse>}
	 */
	async updateProfile(updates) {
		const payload = {};

		// Map frontend fields to new backend fields
		if (updates.fullName !== undefined)
			payload.full_name = updates.fullName;
		if (updates.firstName !== undefined)
			payload.full_name =
				updates.firstName +
				(updates.lastName ? ` ${updates.lastName}` : "");
		if (updates.phoneNumber !== undefined)
			payload.phone_number = updates.phoneNumber;
		if (updates.address !== undefined) payload.address = updates.address;

		// Handle profile image upload
		// Note: profile_image may need multipart form data

		const response = await this.apiService.sendPatchRequest(
			"/auth/users/me/",
			{
				data: payload,
				auth: true,
			}
		);

		if (response.success && response.response) {
			const user = this.transformUser(response.response);
			TokenStorage.storeUser(user);
		}

		return response;
	}

	/**
	 * Complete onboarding process
	 * @param {Object} details
	 * @returns {Promise<BackendResponse>}
	 */
	async completeOnboarding(details) {
		return this.updateProfile(details);
	}

	/**
	 * Transform backend user data to frontend format
	 * Updated to match new backend User model fields
	 * @param {Object} data
	 * @returns {Object}
	 */
	transformUser(data) {
		return {
			id: data.id,
			email: data.email,
			name: data.full_name || "",
			fullName: data.full_name,
			phoneNumber: data.phone_number,
			address: data.address,
			profileImage: data.profile_image,
			avatar: data.profile_image, // alias for compatibility
			isActive: data.is_active,
			isStaff: data.is_staff,
			isAdmin: data.is_admin,
			dateJoined: data.date_joined,
		};
	}

	/**
	 * Logout user and clear all tokens
	 */
	logout() {
		TokenStorage.clearTokens();
		TokenStorage.clearUser();
	}

	/**
	 * Check if user is authenticated
	 * @returns {boolean}
	 */
	isAuthenticated() {
		return TokenStorage.hasAccessToken();
	}

	/**
	 * Get cached user from storage
	 * @returns {Object|null}
	 */
	getStoredUser() {
		return TokenStorage.getStoredUser();
	}

	/**
	 * Get access token
	 * @returns {string|null}
	 */
	getAccessToken() {
		return TokenStorage.getAccessToken();
	}

	/**
	 * Get refresh token
	 * @returns {string|null}
	 */
	getRefreshToken() {
		return TokenStorage.getRefreshToken();
	}
}

export { TokenStorage };
export default AuthService.init();
