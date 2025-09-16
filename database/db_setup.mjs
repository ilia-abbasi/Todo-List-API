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
    user_id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (100) NOT NULL,
    password VARCHAR (128) NOT NULL,
    registered_at TIMESTAMP NOT NULL,
    last_login_at TIMESTAMP NOT NULL
    );
  `);

  console.log('Database: Successfully created "users" table');
}

async function createTodosTable() {
  await client.query(`
    CREATE TABLE todos(
    todo_id serial PRIMARY KEY,
    user_id INTEGER,
    title VARCHAR (50) NOT NULL,
    description VARCHAR (10000) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
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
