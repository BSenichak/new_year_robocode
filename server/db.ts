import { config } from "dotenv";
import { createPool, type Pool } from "mysql2/promise";

config();

const DB_NAME = process.env.DB_NAME!;

const rootPool = createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
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
            CREATE TABLE IF NOT EXISTS \`victories\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`count\` INT NOT NULL DEFAULT 0,
  \`user_id\` VARCHAR(255) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uniq_user\` (\`user_id\`)
);
        `);
        return pool;
    } catch (err) {
        console.error("DB init error:", err);
        process.exit(1);
    }
}

const pool = await initDatabase();
export default pool;
