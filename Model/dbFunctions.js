/**
 * This file contains functions to create table in the database
 */

const pool = require("./connection");

const dbQueries = {
    site: "site_id uuid PRIMARY KEY",

    materials:
        "site_id uuid NOT NULL, material_id uuid NOT NULL,name text, volume double precision NOT NULL, cost money NOT NULL, color text NOT NULL, delivery_date date",
};

/**
 * Creates a new table in the database by the given name
 * @param {string} tableName
 * @returns {Promise} Promise object representing the status of the table creation
 */
const createTable = async (tableName) => {
    const client = await pool.connect();
    const query = `CREATE TABLE ${tableName} (${dbQueries[tableName]});`;

    try {
        const res = await client.query(query);
        return `Table ${tableName} is successfully created`;
    } catch (err) {
        if (err.code === "42P07") {
            return `Table ${tableName} already exists!`;
        } else {
            throw Error(err.stack);
        }
    } finally {
        client.release();
    }
};

/**
 * Deletes the table from the database
 * @param {string} tableName
 * @returns {Promise} Promise object representing the status of the table deletion
 */
const deleteTable = async (tableName) => {
    const client = await pool.connect();
    const query = `DROP TABLE ${tableName};`;

    try {
        const res = await client.query(query);
        return `Table ${tableName} is successfully deleted`;
    } catch (error) {
        if (error.code === "42P01") {
            console.log("Table site does not exists");
            return;
        }
        throw Error(err.stack);
    } finally {
        client.release();
    }
};

module.exports = { createTable, deleteTable };
