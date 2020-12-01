const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV.trim() === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();
const path = require('path');

const apiPaths = {
  '/api': {
    target: 'http://[::1]:8080',
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
    // console.log(path.join(__dirname+'/public/dictionary.html'));
    // server.get('/dictionary',(req,res) => {
    //   res.sendFile(path.join(__dirname+'/public/dictionary.html'));
    // });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error:::::', err);
  });
