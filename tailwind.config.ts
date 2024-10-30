/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#FE724C",
                    200: "#FFD5C9",
                },
                secondary: {
                    DEFAULT: "#FF9C01",
                    100: "#FF9001",
                    200: "#FF8E01",
                },
                black: {
                    DEFAULT: "#000",
                    100: "#1E1E2D",
                    200: "#232533",
                },
                gray: {
                    100: "#CDCDE0",
                },
            },
            gradientColorStops: {},
            fontSize: {
                xs: "11px",
                sm: "12px",
                base: "14px",
                lg: "16px",
                xl: "18px",
                "2xl": "20px",
                "3xl": "22px",
                "4xl": "24px",
                "5xl": "26px",
            },
            fontFamily: {
                pthin: ["Poppins-Thin", "sans-serif"],
                pextralight: ["Poppins-ExtraLight", "sans-serif"],
                plight: ["Poppins-Light", "sans-serif"],
                pregular: ["Poppins-Regular", "sans-serif"],
                pmedium: ["Poppins-Medium", "sans-serif"],
                psemibold: ["Poppins-SemiBold", "sans-serif"],
                pbold: ["Poppins-Bold", "sans-serif"],
                pextrabold: ["Poppins-ExtraBold", "sans-serif"],
                pblack: ["Poppins-Black", "sans-serif"],
            },
            height: {
                "11/12": "91.666667%",
                4.5: "18px",
                13: "52px",
                15: "60px",
            },
            width: {
                4.5: "18px",
                13: "52px",
                15: "60px",
            },
        },
    },
    plugins: [],
};
