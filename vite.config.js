import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const port = parseInt(env.PORT || '5173', 10)
  const appTitle = env.VITE_APP_TITLE || 'JobFinder | Tech Jobs in Thailand & Global Remote'
  const appDescription =
    env.VITE_APP_DESCRIPTION || 'Clean and simple tech job finder for Thailand and global remote roles.'

  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html
            .replace(/%VITE_APP_TITLE%/g, appTitle)
            .replace(/%VITE_APP_DESCRIPTION%/g, appDescription)
        },
      },
    ],
    server: {
      port: !isNaN(port) ? port : 5173,
    },
  }
})

