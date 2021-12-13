const config = require('../config');
const dbConfig = config.db;
const knex = require('knex')(dbConfig);


class DB {

  constructor () {
    this.db = knex;
  };

  async connected () {
    console.log(`DB connected on PORT: ${dbConfig.connection.port}`);
    return knex.raw('SELECT 1 as dbUp');
  };
};

const db = new DB();

(async function main () {
  if (require.main === module) {
    process.exit(0);
  };
})();

module.exports = db;
