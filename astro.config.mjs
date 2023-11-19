import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import Icons from 'unplugin-icons/vite'
import vue from '@astrojs/vue'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind(), vue(), react()],
  vite: {
    plugins: [
      Icons({
        compiler: 'raw',
        autoInstall: true,
      }),
    ],
  },
})
