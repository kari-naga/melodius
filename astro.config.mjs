import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

import tailwind from '@astrojs/tailwind'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()],
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
        autoInstall: true,
      }),
    ],
  },
})
