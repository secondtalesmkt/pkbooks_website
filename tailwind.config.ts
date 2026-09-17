import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Official PK Books Brand Colors
        pk: {
          blue: "#0057B8",
          "blue-dark": "#00438F",
          "blue-light": "#EEF5FF",
          red: "#E51A34",
          "red-dark": "#C40022",
          "red-light": "#FFF0F2"
        },
        // Theme mapped tokens
        ink: "#0F172A",
        clay: "#E51A34",
        palm: "#0057B8",
        saffron: "#F59E0B",
        paper: "#F8FAFC",
        mist: "#F1F5F9"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
        card: "0 4px 20px -2px rgba(0, 87, 184, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)"
      }
    }
  },
  plugins: []
};

export default config;
