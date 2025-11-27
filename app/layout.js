export const metadata = {
	title: "Freelancer Dashboard",
};

import "./../styles/globals.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
					rel="stylesheet"
				/>
			</head>

			<body className="bg-background-light dark:bg-background-dark font-display">
				{children}
			</body>
		</html>
	);
}
