import { config } from "dotenv";
import { createPool, type Pool } from "mysql2/promise";

config();

const DB_NAME = process.env.DB_NAME!;

const rootPool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
});

async function initDatabase() {
    try {
        await rootPool.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        const pool: Pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: DB_NAME,
            waitForConnections: true,
            connectionLimit: 100,
        });

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        return pool;
    } catch (err) {
        console.error("DB init error:", err);
        process.exit(1);
    }
}

const pool = await initDatabase();
export default pool;
