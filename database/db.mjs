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

function makeDatabaseResponse(error, result) {
  return { error, result };
}

async function checkEmailExists(email) {
  const query = "SELECT user_id FROM users WHERE email = $1;";

  try {
    const result = await pool.query(query, [email]);
    return makeDatabaseResponse(null, result.rowCount);
  } catch (error) {
    return makeDatabaseResponse(error, null);
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
  } catch (error) {
    return makeDatabaseResponse(error, null);
  }
}

export { initializePool, checkEmailExists, insertUser };
