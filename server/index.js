if (process.env.NODE_ENV!=='production') {
  require('dotenv').config();
}
const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const utils = require('./utils');

const app = express();
app.use(logger('dev'));
app.use(utils.http.helpers);
app.use(bodyParser.json());

app.get('/foo', (req, res) => {
  res.replyOK();
});

// serve the app
app.all('*', (req, res) => {
  const filepath = path.join(__dirname, '../app/dist', req.path);
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
    return
  }
  res.sendFile(path.join(__dirname, '../app/dist/index.html'));
});


const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`serving :${port}`));
