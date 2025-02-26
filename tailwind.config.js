/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                secondary: "var(--secondary)",
                foreground: "var(--foreground)",
            },
            animation: {
                'appear': 'appear linear',
            },
            backdropBlur: {
                xs: '2px',
            },
            keyframes: {
                appear: {
                    'from': { opacity: 0 },
                    'to': { opacity: 1 },
                },
            },
        },
    },
    plugins: [
    ],
}
