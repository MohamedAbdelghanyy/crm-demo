const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');

const port = 5000;

const server = http.createServer((req, res) => {
  // Enable CORS for all routes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    // Respond to preflight requests
    res.writeHead(200);
    res.end();
    return;
  }

  // Proxy requests to the actual API server
  const proxy = createProxyMiddleware({
    target: 'https://api.ligare.app',
    changeOrigin: true,
  });

  proxy(req, res, () => {
    // If the request is not handled by the proxy, you can handle it here
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  });
});

server.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
