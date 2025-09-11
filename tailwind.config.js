const { mauve, violet, red, blackA } = require('@radix-ui/colors');
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
        bgGreyColor: "#F9F9F9",
        whiteColor: "#fff",
        textGreyColor: "#B9C4D1",
        blackColor: "#545454",
        inputFieldColor: "#F7F7F7",
        inputTextColor: "#8D8C92",
        redColor: "#FB2121",
        buttonGradientPrimary: "#274F01",
        buttonGradientSecondary: "#57C627",
        buttonColor: "#48A01B",
        overlayColor: "#09090984",
        shadowColor : "#E5E5E5",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        fr: ["Poppins", "sans-serif"],
        arabic: ["Tajawal", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    keyframes: {
      sideBarLeftAnimation: {
        from: { opacity: 0.5, transform: "translate(-100%, 0%)" },
        to: { opacity: 1, transform: "translate(0%, 0%)" },
      },
      sideBarRightAnimation: {
        from: { opacity: 0.5, transform: "translate(100%, 0%)" },
        to: { opacity: 1, transform: "translate(0%, 0%)" },
      },
      overlayShow: {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
      contentShow: {
        from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
      },
    },
    animation: {
      sideBarLeftAnimation: "sideBarLeftAnimation 700ms cubic-bezier(0.16, 1, 0.3, 1) ",
      sideBarRightAnimation: "sideBarRightAnimation 700ms cubic-bezier(0.16, 1, 0.3, 1) ",
      overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  plugins: [require("tailwindcss-animate")],
};
