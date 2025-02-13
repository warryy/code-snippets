// node --watch js/handwrite/chain-find/server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8'));
});

server.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});