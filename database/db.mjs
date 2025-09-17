import { Pool } from "pg";

let pool = null;

function initializePool() {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  console.log("Database: Initialized pool");

  return pool;
}

function makeDatabaseResponse(err, result) {
  return { err, result };
}

async function checkEmailExists(email) {
  const query = "SELECT user_id FROM users WHERE email = $1;";

  try {
    const result = await pool.query(query, [email]);
    return makeDatabaseResponse(null, result.rowCount);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

async function insertUser(name, email, hashedPassword) {
  const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING user_id;
  `;

  try {
    const result = await pool.query(query, [name, email, hashedPassword]);
    return makeDatabaseResponse(null, result.rows[0]);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

async function selectUser(email) {
  const query = "SELECT * FROM users WHERE email = $1;";

  try {
    const result = await pool.query(query, [email]);
    return makeDatabaseResponse(null, result.rows[0]);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

async function updateLastLogin(user_id) {
  const query = `
  UPDATE users
  SET last_login_at = NOW()
  WHERE user_id = $1;
  `;

  try {
    await pool.query(query, [user_id]);
  } catch (err) {
    console.log(
      `Database: Failed to update last_login_at of user_id = ${user_id}:`
    );
    console.log(err);
  }
}

async function insertTodo(title, description, user_id) {
  const query = `
  INSERT INTO todos (title, description, user_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  try {
    const result = await pool.query(query, [title, description, user_id]);
    return makeDatabaseResponse(null, result.rows[0]);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

export {
  initializePool,
  checkEmailExists,
  insertUser,
  selectUser,
  updateLastLogin,
  insertTodo,
};
