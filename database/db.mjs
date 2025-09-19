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

async function getUserCountByEmail(email) {
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

async function updateLastLogin(userId) {
  const query = `
  UPDATE users
  SET last_login_at = NOW()
  WHERE user_id = $1;
  `;

  try {
    await pool.query(query, [userId]);
  } catch (err) {
    console.log(
      `Database: Failed to update last_login_at of user_id = ${userId}:`
    );
    console.log(err);
  }
}

async function insertTodo(title, description, userId) {
  const query = `
  INSERT INTO todos (title, description, user_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  try {
    const result = await pool.query(query, [title, description, userId]);
    return makeDatabaseResponse(null, result.rows[0]);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

async function getTodo(todoId) {
  const query = "SELECT * FROM todos WHERE todo_id = $1;";

  try {
    const result = await pool.query(query, [todoId]);
    return makeDatabaseResponse(null, result.rows[0]);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

async function updateTodoDB(todoId, title, description, userId) {
  const query = `
  UPDATE todos
  SET title = $1, description = $2, updated_at = NOW()
  WHERE todo_id = $3 AND user_id = $4
  RETURNING *;
  `;

  try {
    const result = await pool.query(query, [
      title,
      description,
      todoId,
      userId,
    ]);
    return makeDatabaseResponse(null, result.rows[0]);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

export {
  initializePool,
  getUserCountByEmail,
  insertUser,
  selectUser,
  updateLastLogin,
  insertTodo,
  getTodo,
  updateTodoDB,
};
