// =============================================================================
// Master Print - Cloud & Production HTTP Server (Node.js)
// Zero external dependencies required - Runs out of the box on any Cloud Server
// Compatible with Render, Railway, Fly.io, Koyeb, VPS, or Docker
// =============================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = parseInt(process.env.PORT || '8080', 10);
const ROOT_DIR = __dirname;
const DB_FILE = path.join(ROOT_DIR, 'master_print_db.json');
const BACKUP_FILE = path.join(ROOT_DIR, 'master_print_db_backup.json');

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp'
};

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-cache, no-store'
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. Health check & Server info
  if (pathname === '/health' || pathname === '/api/health') {
    return sendJson(res, 200, { status: 'healthy', timestamp: new Date().toISOString() });
  }

  if (pathname === '/api/server-info') {
    return sendJson(res, 200, {
      status: 'online',
      server: 'MasterPrint-Cloud',
      port: PORT,
      timestamp: new Date().toISOString()
    });
  }

  // 2. Load Database API
  if (pathname === '/api/load-data' && req.method === 'GET') {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const json = JSON.parse(raw);
        return sendJson(res, 200, json);
      } catch (err) {
        console.error('Error reading database file:', err);
        return sendJson(res, 500, { error: 'Failed to read database' });
      }
    } else {
      return sendJson(res, 200, { orders: [], caisse: [], stock: [] });
    }
  }

  // 3. Save Database API
  if (pathname === '/api/save-data' && req.method === 'POST') {
    let bodyChunks = [];
    req.on('data', chunk => {
      bodyChunks.push(chunk);
    });

    req.on('end', () => {
      try {
        const bodyBuffer = Buffer.concat(bodyChunks);
        if (bodyBuffer.length > 200) {
          // Validate JSON integrity before saving
          const parsed = JSON.parse(bodyBuffer.toString('utf8'));
          
          // Automatic rolling backup
          if (fs.existsSync(DB_FILE)) {
            try {
              fs.copyFileSync(DB_FILE, BACKUP_FILE);
            } catch (backupErr) {
              console.warn('Backup creation warning:', backupErr);
            }
          }

          fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf8');
          console.log(`[${new Date().toISOString()}] Database successfully saved (${bodyBuffer.length} bytes).`);
          return sendJson(res, 200, { status: 'saved', timestamp: new Date().toISOString() });
        } else {
          return sendJson(res, 400, { error: 'Payload too small or invalid' });
        }
      } catch (err) {
        console.error('Failed to parse or write database payload:', err);
        return sendJson(res, 500, { error: 'Failed to save data: ' + err.message });
      }
    });

    req.on('error', err => {
      console.error('Request stream error:', err);
      return sendJson(res, 500, { error: 'Stream error' });
    });
    return;
  }

  // 4. Static Files Serving
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(path.join(ROOT_DIR, pathname));
  // Security check: prevent directory traversal
  if (!safePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for Single Page App
      const indexPath = path.join(ROOT_DIR, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        return fs.createReadStream(indexPath).pipe(res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': ext === '.html' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=86400'
    });

    const readStream = fs.createReadStream(safePath);
    readStream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('======================================================');
  console.log(` Master Print Cloud Server running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
  console.log('======================================================');
});
