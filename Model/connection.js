/**
 * This file contains functions to make connection to the database using the
 * enviroment variables from the .env file
 */

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database:
        process.env.NODE_ENV === "PROD"
            ? process.env.PGDATABASE
            : process.env.PGTESTDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

pool.on("error", (err, client) => {
    console.error("Error:", err);
});

module.exports = pool;
