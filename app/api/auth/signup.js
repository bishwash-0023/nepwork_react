import { routes } from "../routes";

// src/app/api/auth/signup.js (example function)
export async function signup(data) {
	const res = await fetch(routes.signup, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return await res.json();
}
