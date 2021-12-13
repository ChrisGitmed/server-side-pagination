
exports.up = knex => {
  return knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      uuid UUID DEFAULT uuid_generate_v4() NOT NULL,
      active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT current_timestamp,
      updated_at TIMESTAMPTZ DEFAULT current_timestamp,

      name VARCHAR(255)
    );
  `)
};

exports.down = knex => knex.raw(`DROP TABLE IF EXISTS users;`);
