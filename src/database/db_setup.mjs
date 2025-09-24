import "../helpers/load_env.mjs";

import { Client } from "pg";

let test = false;

if (process.argv[2] === "test") {
  test = true;
}

const client = new Client({
  user: test ? process.env.DB_USER_TEST : process.env.DB_USER,
  host: test ? process.env.DB_HOST_TEST : process.env.DB_HOST,
  database: test ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  password: test ? process.env.DB_PASS_TEST : process.env.DB_PASS,
  port: test ? process.env.DB_PORT_TEST : process.env.DB_PORT,
});

function customLog(text = "") {
  console.log(`${test ? "[TEST] " : ""}Database: ${text}`);
}

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

  customLog('Successfully created "users" table');
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

  customLog('Successfully created "todos" table');
}

createUsersTable()
  .then(() => createTodosTable())
  .then(() => customLog("Setup is completed"))
  .catch((err) =>
    customLog(`Something went wrong while running the setup. ${err}`)
  );
