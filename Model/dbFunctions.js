const pool = require("./connection");

const dbQueries = {
    site: "site_id uuid PRIMARY KEY",

    materials:
        "site_id uuid NOT NULL, material_id uuid NOT NULL,name text, volume double precision NOT NULL, cost money NOT NULL, color text NOT NULL, delivery_date date",
};

/**
 * Creates a new table in the database by the given name
 * @param {string} tableName
 * @returns {string}
 */
const createTable = async (tableName) => {
    const client = await pool.connect();
    const query = `
    CREATE TABLE ${tableName} (
        ${dbQueries[tableName]}
    );`;

    try {
        const res = await client.query(query);
        return `Table ${tableName} is successfully created`;
    } catch (err) {
        if (err.code === "42P07") {
            return `Table ${tableName} already exists!`;
        } else {
            throw Error(err.stack);
        }
    }
};

module.exports = { createTable };
