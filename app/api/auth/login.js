export async function login(username, password) {
	const res = await fetch("http://localhost:8000/auth/jwt/create/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	const data = await res.json();

	// Save tokens to cookies/localStorage
	if (data.access) {
		localStorage.setItem("access", data.access);
		localStorage.setItem("refresh", data.refresh);
	}

	return data;
}
