const mockFs = new Set(['manifest.json']);
let mockConfig = { autoUpdate: "false", interval: "1800", url: "" };

// Helper to assemble standardized JSON response structures
const jsonResponse = (data, status = 200, headers = {}) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers }
  });
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercept all outgoing fetch operations seamlessly
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Filter requests matching your Android Native API routes
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        // Realistic network latency delay
        await new Promise(r => setTimeout(r, 100));
        const path = url.pathname;
        const params = url.searchParams;

        // --- App Controller Mocks ---
        if (path === '/api/app/device-status') {
          return jsonResponse({ status: 'active', userAgent: 'Mock-Desktop-Browser' }, 200, {
            'X-Powered-By': 'Android Native Framework Interceptor'
          });
        }
        if (path === '/api/app/export-localstorage') {
          return jsonResponse({ status: 'success' });
        }
        if (path === '/api/app/import-localstorage') {
          return jsonResponse({ theme: 'dark', cachedToken: 'test_token_abc123' });
        }

        // --- FS Controller Mocks ---
        if (path === '/api/fs/mkdir' || path === '/api/fs/write') {
          const target = params.get('path');
          if (target) mockFs.add(target);
          return jsonResponse({ status: 'success' });
        }
        if (path === '/api/fs/read') {
          return new Response('{"active":true}', {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        if (path === '/api/fs/list') {
          return jsonResponse({ status: 'success', files: Array.from(mockFs) });
        }
        if (path === '/api/fs/zip' || path === '/api/fs/unzip') {
          return jsonResponse({ status: 'success', archiveSize: 4096 });
        }
        if (path === '/api/fs/delete') {
          const target = params.get('path');
          if (target) mockFs.delete(target);
          return jsonResponse({ status: 'success' });
        }

        // --- Maintenance Controller Mocks ---
        if (path === '/api/maintenance/config') {
          return jsonResponse(mockConfig);
        }
        if (path === '/api/maintenance/save') {
          mockConfig.autoUpdate = params.get('autoUpdate') || "false";
          mockConfig.interval = params.get('interval') || "0";
          mockConfig.url = params.get('url') || "";
          return jsonResponse({ status: 'success' });
        }
        if (path === '/api/maintenance/sync-sd') {
          return jsonResponse({ status: 'success' });
        }

        // --- Network Proxy Mocks ---
        if (path === '/api/net/proxy') {
          return jsonResponse({
            status: 200,
            body: JSON.stringify({ id: 1, info: "Mocked Upstream Redirect via Service Worker" })
          });
        }

        return new Response('Mock Path Not Found', { status: 404 });
      })()
    );
  }
});

