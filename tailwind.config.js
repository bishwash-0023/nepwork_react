/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#13b6ec",
				"background-light": "#f6f8f8",
				"background-dark": "#101d22",
			},
			fontFamily: {
				display: ["Inter", "sans-serif"],
			},
			borderRadius: {
				DEFAULT: "0.25rem",
				lg: "0.5rem",
				xl: "0.75rem",
				full: "9999px",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/container-queries"),
	],
};
