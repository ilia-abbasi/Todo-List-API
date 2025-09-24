import { Pool } from "pg";

let pool = null;
let test = null;

function initializePool(options = { test: false }) {
  options = options || { test: false };
  test = options.test;
  pool = new Pool({
    user: test ? process.env.DB_USER_TEST : process.env.DB_USER,
    host: test ? process.env.DB_HOST_TEST : process.env.DB_HOST,
    database: test ? process.env.DB_NAME_TEST : process.env.DB_NAME,
    password: test ? process.env.DB_PASS_TEST : process.env.DB_PASS,
    port: test ? process.env.DB_PORT_TEST : process.env.DB_PORT,
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

async function updateTodo(todoId, title, description, userId) {
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

async function deleteTodo(todoId) {
  const query = "DELETE FROM todos WHERE todo_id = $1;";

  try {
    await pool.query(query, [todoId]);
    return makeDatabaseResponse(null, null);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

async function getTodos(page, limit, userId) {
  const query = `
  SELECT * FROM todos
  WHERE user_id = $1
  LIMIT $2 OFFSET $3;
  `;
  const offset = limit * (page - 1);

  try {
    const result = await pool.query(query, [userId, limit, offset]);
    return makeDatabaseResponse(null, result.rows);
  } catch (err) {
    return makeDatabaseResponse(err, null);
  }
}

export default {
  initializePool,
  getUserCountByEmail,
  insertUser,
  selectUser,
  updateLastLogin,
  insertTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  getTodos,
};
