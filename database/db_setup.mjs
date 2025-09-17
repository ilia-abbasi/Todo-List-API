import dotenv from "dotenv";
dotenv.config();

import { Client } from "pg";

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function createUsersTable() {
  await client.connect();
  await client.query(`
    CREATE TABLE users(
      user_id SERIAL PRIMARY KEY,
      name VARCHAR (50) NOT NULL,
      email VARCHAR (320) NOT NULL UNIQUE, -- RFC 5321 compliant
      password VARCHAR (60) NOT NULL,
      registered_at TIMESTAMP DEFAULT NOW(),
      last_login_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log('Database: Successfully created "users" table');
}

async function createTodosTable() {
  await client.query(`
    CREATE TABLE todos(
      todo_id SERIAL PRIMARY KEY,
      user_id INTEGER,
      title VARCHAR (50) NOT NULL,
      description VARCHAR (3000) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT fk_user
          FOREIGN KEY (user_id)
          REFERENCES users(user_id)
    );
  `);
  await client.end();

  console.log('Database: Successfully created "todos" table');
}

createUsersTable()
  .then(() => createTodosTable())
  .then(() => console.log("Database: Setup is completed"))
  .catch((err) =>
    console.log(
      `Database: Something went wrong while running the setup. ${err}`
    )
  );
