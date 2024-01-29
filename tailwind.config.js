/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      screens: {
        xs: '400px'
      }
    }
  }
}
