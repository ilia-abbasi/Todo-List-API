import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

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

export { pool, checkEmailExists };
