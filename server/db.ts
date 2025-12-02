import { config } from "dotenv";
import { createPool, type Pool } from "mysql2/promise";

config();

const DB_NAME = process.env.DB_NAME!;

const rootPool = createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE,
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
});

async function initDatabase() {
    try {
        await rootPool.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        const pool: Pool = createPool({
            host: process.env.DB_HOST || process.env.MYSQLHOST,
            user: process.env.DB_USER || process.env.MYSQLUSER,
            password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
            database: process.env.DB_NAME || process.env.MYSQLDATABASE,
            port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),

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
