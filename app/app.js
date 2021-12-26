const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config');
const { Err } = require('./lib/error');
const db = require('./db')
const routes = require('./router')

const app = express();

class Application {
  constructor() {
    this.app = app.use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(helmet())
      .use(cors({ exposedHeaders: ['Content-Disposition'] }))
      .use(morgan('dev'))
      .use('/api', routes)

      // Top level error handling
      .use(async (err, req, res, next) => {
        if (res.headersSent) { return next(err) };

        if (err instanceof Err) {
          console.log('::::ERR::::');
          console.log('::::UUID: ', err.uuid);
          console.log('::::CODE: ', err.code);
          console.log('::::MSG: ', err.message);
          return res.status(err.code).json({ message: err.message });
        };

        // Unknown error
        console.log('::::ERR - UNKNOWN::::');
        console.log('::::CODE: ', err.code);
        console.log('::::MSG: ', err.message);
        return res.status(500).json({ message: `Uknown error occured: ${err.message}` });
      });
  };

  async start (port) {
    process.on('uncaughtException', (e) => console.error('Top-Level exception', e, e.stack));

    await db.connected();

    return new Promise((resolve, reject) => {
      app.listen(port, async err => {
        if (err) {
          console.log(err);
          reject(err);
        };
        console.info(`Server now listening on port: ${port}`);
        resolve();
      });
    });
  };
};

(async function main () {
  // called directly (i.e. from command line)
  if (require.main === module) await new Application().start(config.port || 8080);
})();

