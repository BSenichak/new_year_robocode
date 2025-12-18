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

async function initDatabase(): Promise<Pool> {
    try {
        await rootPool.query(
            `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`
             CHARACTER SET utf8mb4
             COLLATE utf8mb4_0900_ai_ci`
        );
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
            CREATE TABLE IF NOT EXISTS \`users\` (
                \`id\` BIGINT NOT NULL AUTO_INCREMENT,
                \`google_id\` VARCHAR(255) NOT NULL,
                \`email\` VARCHAR(255) DEFAULT NULL,
                \`name\` VARCHAR(255) DEFAULT NULL,
                \`avatar\` TEXT,
                \`access_token\` TEXT,
                \`refresh_token\` TEXT,
                \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`uniq_google_id\` (\`google_id\`)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`users_stats\` (
                \`id\` BIGINT NOT NULL AUTO_INCREMENT,
                \`google_id\` VARCHAR(255) NOT NULL,
                \`email\` VARCHAR(255) NOT NULL,
                \`display_name\` VARCHAR(255) NOT NULL,
                \`decode_count\` INT NOT NULL DEFAULT 0,
                \`ease\` INT NOT NULL DEFAULT 0,
                \`middle\` INT NOT NULL DEFAULT 0,
                \`hard\` INT NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`uniq_google_id\` (\`google_id\`),
                UNIQUE KEY \`uniq_email\` (\`email\`)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`victories\` (
                \`id\` BIGINT NOT NULL AUTO_INCREMENT,
                \`count\` INT NOT NULL DEFAULT 0,
                \`user_id\` VARCHAR(255) NOT NULL,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`uniq_user\` (\`user_id\`)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`sessions\` (
                \`session_id\` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL,
                \`expires\` INT UNSIGNED NOT NULL,
                \`data\` MEDIUMTEXT COLLATE utf8mb4_unicode_ci,
                PRIMARY KEY (\`session_id\`),
                KEY \`expires_idx\` (\`expires\`)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`daily_overall_progress\` (
                \`id\` BIGINT NOT NULL AUTO_INCREMENT,
                \`date\` DATE NOT NULL,
                \`total_decode_count\` INT NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`uniq_date\` (\`date\`)
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

