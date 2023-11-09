import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      center: true,
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': {
            transform: 'translateY(-4px)',
            backgroundColor: colors.lime[600],
          },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
        jump: 'jump 500ms ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
