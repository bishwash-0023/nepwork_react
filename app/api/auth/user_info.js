export async function getUser() {
	const access = localStorage.getItem("access");

	const res = await fetch("http://localhost:8000/auth/users/me/", {
		headers: {
			Authorization: `Bearer ${access}`,
		},
	});

	return await res.json();
}
