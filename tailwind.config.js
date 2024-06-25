/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            container: {
                center: true,
            },
            colors: {
                // Primary
                'green-default': 'hsl(148, 38%, 70%)',
                'green-light': 'hsl(148, 38%, 91%)',
                'green-medium': 'hsl(169, 82%, 27%)',
                'green-dark': 'hsl(169, 82%, 15%)',
                red: 'hsl(0, 66%, 54%)',
                // Neutral
                white: 'hsl(0, 0%, 100%)',
                'grey-medium': 'hsl(186, 15%, 59%)',
                'grey-dark': 'hsl(187, 24%, 22%)',
            },
            fontFamily: {
                karla: ['Karla', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
