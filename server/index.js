if (process.env.NODE_ENV!=='production') {
  require('dotenv').config();
}
const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());


// serve the app
app.all('*', (req, res) => {
  const filepath = path.join(__dirname, '../app/dist', req.path);
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
    return
  }
  res.sendFile(path.join(__dirname, '../app/dist/index.html'));
});
