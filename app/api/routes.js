/**
 * API Routes - Updated to match new backend structure
 * Based on z_readmes documentation
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const routes = {
	// Auth endpoints (from accounts.md)
	auth: {
		signup: `${BASE}/auth/signup/`,
		login: `${BASE}/auth/login/`,
		me: `${BASE}/auth/users/me/`,
		refresh: `${BASE}/auth/jwt/refresh/`,
		verify: `${BASE}/auth/jwt/verify/`,
		publicUser: (id) => `${BASE}/auth/users/${id}/public/`,
		users: `${BASE}/auth/users/`, // Admin only
	},

	// Job endpoints (from jobs.md)
	jobs: {
		create: `${BASE}/jobs/new`,
		list: `${BASE}/jobs/list`,
		detail: (id) => `${BASE}/jobs/detail/${id}/`,
		update: (id) => `${BASE}/jobs/update/${id}/`,
		delete: (id) => `${BASE}/jobs/delete/${id}/`,
		mine: `${BASE}/jobs/mine/`,
		hired: `${BASE}/jobs/hired/`,
	},

	// Bid endpoints (from bids.md)
	bids: {
		create: `${BASE}/bids/new`,
		listForJob: (jobId) => `${BASE}/bids/list/${jobId}/`,
		update: (id) => `${BASE}/bids/update/${id}/`,
		delete: (id) => `${BASE}/bids/delete/${id}/`,
		mine: `${BASE}/bids/mine/`,
		byUser: (userId) => `${BASE}/bids/user/${userId}/`, // Admin only
		accept: (id) => `${BASE}/bids/accept/${id}/`,
		reject: (id) => `${BASE}/bids/reject/${id}/`,
	},

	// Message endpoints (from messaging.md)
	messages: {
		send: `${BASE}/messages/new`,
		conversation: (userId) => `${BASE}/messages/conversation/${userId}/`,
		delete: (id) => `${BASE}/messages/delete/${id}/`,
		mine: `${BASE}/messages/mine/`,
		sent: `${BASE}/messages/sent/`,
		received: `${BASE}/messages/received/`,
		conversations: `${BASE}/messages/conversations/`,
		unreadCount: `${BASE}/messages/unread/count/`,
		markRead: (id) => `${BASE}/messages/read/${id}/`,
	},

	// Comment endpoints (from comments.md)
	comments: {
		create: `${BASE}/comments/new`,
		listForJob: (jobId) => `${BASE}/comments/list/${jobId}/`,
		update: (id) => `${BASE}/comments/update/${id}/`,
		delete: (id) => `${BASE}/comments/delete/${id}/`,
		mine: `${BASE}/comments/mine/`,
		forJob: (jobId) => `${BASE}/comments/job/${jobId}/`,
		byUser: (userId) => `${BASE}/comments/user/${userId}/`, // Admin/Staff only
	},
};

// Legacy exports for backward compatibility
export const signup = routes.auth.signup;
export const login = routes.auth.login;
export const me = routes.auth.me;
export const refresh = routes.auth.refresh;
