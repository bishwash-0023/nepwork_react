const BASE = "http://127.0.0.1:8000";

export const routes = {
	signup: `${BASE}/auth/users/`,
	login: `${BASE}/auth/jwt/create/`,
	me: `${BASE}/auth/users/me/`,
	refresh: `${BASE}/auth/jwt/refresh/`,
};
