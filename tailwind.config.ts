import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import colors from 'tailwindcss/colors'
import themes from 'daisyui/src/theming/themes'

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
      },
      center: true,
    },
    extend: {
      fontFamily: {
        serif: ['var(--font-atma)'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...themes.light,
          primary: colors.pink[700],
        },
      },
    ],
  },
}
export default config
