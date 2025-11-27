const BASE = "http://127.0.0.1:8000/auth";

export const routes = {
	signup: `${BASE}/users/`,
	login: `${BASE}/jwt/create/`,
	me: `${BASE}/users/me/`,
	refresh: `${BASE}/jwt/refresh/`,
};
