module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	plugins: [require('tailwindcss-safe-area')],
	theme: {
		extend: {
			fontFamily: {
				'gotham-regular': ['Gotham Black Regular', 'sans-serif'],
				'gotham-medium': ['Gotham Black Medium', 'sans-serif'],
				'gotham-light': ['Gotham Black Light', 'sans-serif'],
				'gotham-thin': ['Gotham Black Thin', 'sans-serif'],
			},
		},
	},
}
