import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const testConnection = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
testConnection();

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
