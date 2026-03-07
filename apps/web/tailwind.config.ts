import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#151515',
        paper: '#f6f1e8',
        ember: '#d4682e',
        spruce: '#27423f',
        blush: '#e9b8a8',
      },
      boxShadow: {
        card: '0 20px 60px rgba(21, 21, 21, 0.14)',
      },
    },
  },
  plugins: [],
};

export default config;
