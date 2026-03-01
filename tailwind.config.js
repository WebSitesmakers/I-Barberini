/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: '#F4EFEA',
                brown: '#5A3E36',
                gold: '#C7A14A',
                charcoal: '#1E1E1E',
                terracotta: '#C45C3D',
                sand: '#E6D5C3',
                olive: '#4F5D46',
                ivory: '#F7F3ED',
                midnight: '#0D0D12',
                champagne: '#C9A84C',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                cormorant: ['"Cormorant Garamond"', 'serif'],
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
                playfair: ['"Playfair Display"', 'serif'],
                inter: ['Inter', 'sans-serif'],
                script: ['"Great Vibes"', 'cursive'],
            },
            transitionTimingFunction: {
                'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            },
        },
    },
    plugins: [],
}
