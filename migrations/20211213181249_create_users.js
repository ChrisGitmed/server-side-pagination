
exports.up = knex => {
  return knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      uuid UUID DEFAULT uuid_generate_v4() NOT NULL,
      active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT current_timestamp,
      updated_at TIMESTAMPTZ DEFAULT current_timestamp,

      email VARCHAR(255) NOT NULL UNIQUE,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,

      password TEXT NOT NULL,
      salt VARCHAR(64)
    );
  `)
};

exports.down = knex => knex.raw(`DROP TABLE IF EXISTS users;`);
