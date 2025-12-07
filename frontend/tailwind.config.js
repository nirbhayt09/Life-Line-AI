/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'medical-blue': '#3B82F6',
                'blood-red': '#B91C1C',
                'health-green': '#10B981',
            }
        },
    },
    plugins: [],
}
