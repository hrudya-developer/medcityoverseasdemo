import "server-only";

import mysql from "mysql2/promise";

/*
 * One MySQL connection pool for the whole server process.
 *
 * On Hostinger the website and the database live on the same account, so
 * DB_HOST is 127.0.0.1 (not "localhost", which can resolve to IPv6).
 * The pool is kept on globalThis so that hot reload in development does
 * not open a new pool on every change.
 */

function createPool() {
    const host = process.env.DB_HOST;
    const database = process.env.DB_NAME;
    const user = process.env.DB_USER;

    if (!host || !database || !user) {
        throw new Error(
            "Database environment variables are missing (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD)."
        );
    }

    return mysql.createPool({
        host,
        port: Number(process.env.DB_PORT || 3306),
        database,
        user,
        password: process.env.DB_PASSWORD || "",
        waitForConnections: true,
        connectionLimit: Number(process.env.DB_POOL_SIZE || 5),
        maxIdle: 2,
        idleTimeout: 60000,
        enableKeepAlive: true,
        charset: "utf8mb4",
        timezone: "+05:30",
        // Match what the Laravel API returned: dates as plain strings
        // ("2026-10-23 16:12:00") and big integers as numbers.
        dateStrings: true,
        supportBigNumbers: true,
        bigNumberStrings: false,
    });
}

function getPool() {
    if (!globalThis.__medcityDbPool) {
        globalThis.__medcityDbPool = createPool();
    }

    return globalThis.__medcityDbPool;
}

/**
 * Run a query and return its rows (SELECT) or result (INSERT/UPDATE/DELETE).
 * Always pass user input through `params`, never by string building.
 */
export async function query(sql, params = []) {
    const [rows] = await getPool().query(sql, params);

    return rows;
}

/**
 * Return the first row of a query, or null.
 */
export async function queryOne(sql, params = []) {
    const rows = await query(sql, params);

    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}
