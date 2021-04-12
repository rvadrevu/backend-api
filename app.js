'use strict';

const appname = 'Starfish Backend API';

const express = require('express');
const cookieParser = require('cookie-parser');
const formRouter = require('./form-router');
const cors = require('cors')
const app = express();
const http = require('http').Server(app);

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/sf-api', formRouter);

// SETTING cookie
app.all('*', (req, res, next) => {
  if (req.headers.cookies) {
    req.cookies = req.headers.cookies; // eslint-disable-line no-param-reassign
  }
  next();
});

app.get('/', function(req, res, next) {
  res.json({ title: 'Starfish API' });
});

// ========================================================================
// START THE SERVER
// Need to let CF set the port if we're deploying there.
const port = process.env.PORT || 9000;


const boot = function boot(cb) {
  http.listen(port, () => {
   console.log(`${appname} started on port ${port}`);
   console.log(`${appname} WebSocket listening on  ${port}`);

    if (cb) {
      cb();
    }
  });

  http.on('error', () => {
    console.error(err.stack);
  });
};

const shutdown = function shutdown() {
  http.close();
  console.log(`${appname} shutdown`);
};
/*
 * Accessing the main module by checking require.main
 * Node.js v5.10.1
 * */
/* istanbul ignore if */
if (require.main === module) {
  boot();
} else {
  app.boot = boot;
  app.shutdown = shutdown;
  app.port = port;
}

module.exports = app;