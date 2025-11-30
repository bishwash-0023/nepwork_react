import axios from "axios";

/**
 * API Service - Axios instance with interceptors
 * Updated to match new backend API structure
 *
 * Auth Endpoints:
 * - POST /auth/login/ - Login
 * - POST /auth/signup/ - Register
 * - POST /auth/jwt/refresh/ - Refresh token
 * - POST /auth/jwt/verify/ - Verify token
 * - GET /auth/users/me/ - Get current user
 * - PUT/PATCH /auth/users/me/ - Update current user
 * - GET /auth/users/{id}/public/ - Get public user profile
 */

// Create axios instance with base config
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
	headers: { "Content-Type": "application/json" },
});

// Token management - uses cookies to be consistent with auth_service.js
const TOKEN_KEY = "nepwork_access_token";
const REFRESH_KEY = "nepwork_refresh_token";

// Helper to get cookie value
function getCookie(name) {
	if (typeof document === "undefined") return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
	return null;
}

// Helper to set cookie
function setCookie(name, value, days = 1) {
	if (typeof document === "undefined") return;
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Helper to delete cookie
function deleteCookie(name) {
	if (typeof document === "undefined") return;
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function getToken() {
	return getCookie(TOKEN_KEY);
}

export function getRefreshToken() {
	return getCookie(REFRESH_KEY);
}

export function setTokens(access, refresh) {
	if (access) setCookie(TOKEN_KEY, access, 1); // 1 day for access token
	if (refresh) setCookie(REFRESH_KEY, refresh, 7); // 7 days for refresh token
}

export function clearTokens() {
	deleteCookie(TOKEN_KEY);
	deleteCookie(REFRESH_KEY);
}

// Request interceptor - add auth token
api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// Response interceptor - handle token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// If 401 and we haven't retried yet, try to refresh token
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			getRefreshToken()
		) {
			originalRequest._retry = true;

			try {
				// Use the new refresh endpoint
				const { data } = await axios.post(
					`${api.defaults.baseURL}/auth/jwt/refresh/`,
					{ refresh: getRefreshToken() }
				);
				// New response format may include both access and refresh
				setTokens(data.access, data.refresh || null);
				originalRequest.headers.Authorization = `Bearer ${data.access}`;
				return api(originalRequest);
			} catch {
				clearTokens();
				if (typeof window !== "undefined")
					window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export default api;
