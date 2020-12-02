const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

const apiPaths = {
  '/api': {
    target: dev ? `http://[::1]:8080` : 'https://api.athoni.com',
    changeOrigin: true,
  },
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.get(['/dictionary'], (req, res) => {
      res.sendFile(__dirname + '/public/dictionary.html');
    });

    server.get(['/'], (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    });

    server.use(['/api'], createProxyMiddleware(apiPaths['/api']));

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error:::::', err);
  });
