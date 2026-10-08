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
      {
        name: 'job-scraper-api',
        configureServer(server) {
          server.middlewares.use('/api/extract-job', async (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            
            if (req.method === 'OPTIONS') {
              res.statusCode = 204;
              res.end();
              return;
            }

            let targetUrl = '';
            if (req.method === 'GET') {
              const urlObj = new URL(req.url, 'http://localhost');
              targetUrl = urlObj.searchParams.get('url');
            } else if (req.method === 'POST') {
              const buffers = [];
              for await (const chunk of req) {
                buffers.push(chunk);
              }
              const bodyStr = Buffer.concat(buffers).toString();
              try {
                const parsed = JSON.parse(bodyStr);
                targetUrl = parsed.url;
              } catch (e) {
                targetUrl = bodyStr;
              }
            }

            if (!targetUrl) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Missing target url parameter' }));
              return;
            }

            try {
              // Ensure protocol
              if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                targetUrl = 'https://' + targetUrl;
              }

              const response = await fetch(targetUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                  'Accept-Language': 'en-US,en;q=0.9',
                },
                redirect: 'follow',
                signal: AbortSignal.timeout(10000)
              });

              const html = await response.text();
              const contentType = response.headers.get('content-type') || '';

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                status: response.status,
                finalUrl: response.url || targetUrl,
                contentType,
                html
              }));
            } catch (err) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: err.message
              }));
            }
          });
        }
      }
    ],
    server: {
      port: !isNaN(port) ? port : 5173,
    },
  }
})

