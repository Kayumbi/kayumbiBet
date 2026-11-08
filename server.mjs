/**
 * KayumbiBet — local preview server
 * Serves the static site in this folder with clean URLs (/login -> login.html).
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4180);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function resolveTarget(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\/+$/, '') || '/';

  const candidates = clean === '/'
    ? [path.join(ROOT, 'index.html')]
    : [path.join(ROOT, clean), path.join(ROOT, `${clean}.html`), path.join(ROOT, clean, 'index.html')];

  for (const candidate of candidates) {
    const full = path.normalize(candidate);
    if (!full.startsWith(ROOT)) continue; // never escape the site root
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const file = resolveTarget(req.url || '/');
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!DOCTYPE html><meta charset="utf-8"><title>404</title>'
      + '<body style="background:#08120e;color:#f5f7f1;font-family:Arial;padding:40px">'
      + '<h1>404</h1><p><a style="color:#c7f464" href="/">Back to KayumbiBet</a></p></body>');
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`KayumbiBet preview: http://localhost:${PORT}`);
});
