const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
  extend: {
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(30px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-out forwards',
      fadeInUp: 'fadeInUp 1.2s ease-out forwards',
      'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  },
}
};

export default config;
