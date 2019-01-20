const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist/spoton')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/spoton/index.html'));
  });
  
  const port = process.env.PORT || '3000';
  app.set('port', port);
  
  mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/spoton');

  const server = http.createServer(app);

  server.listen(port, () => console.log(`API running on localhost:${port}`));