/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#137fec",
				"background-light": "#f6f7f8",
				"background-dark": "#101922",
			},
			fontFamily: {
				display: ["Inter", "sans-serif"],
			},
			borderRadius: {
				DEFAULT: "0.5rem",
				lg: "1rem",
				xl: "1.5rem",
				full: "9999px",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/container-queries"),
	],
};
