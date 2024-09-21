const {nextui} = require('@nextui-org/theme');
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "flowbite.content()",
    "./node_modules/@nextui-org/theme/dist/components/(button|dropdown|input|ripple|spinner|menu|divider|popover).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    nextui()
  ],
}
