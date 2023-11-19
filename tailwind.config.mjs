/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
			  border: 'border 2s ease infinite',
			},
			keyframes: {
			  border: {
				'0%, 100%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
			  },
			},
		  },
	},
	plugins: [],
	darkMode: 'class',
}
