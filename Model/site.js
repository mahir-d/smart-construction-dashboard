/**
 * This file contains functions to add, read and delete site in the
 * database
 */

const pool = require("./connection");
const { v4: uuidv4 } = require("uuid");

/**
 * Creates a new site with a unique uuid
 * @returns {Promise} Promise object represents the id of the newly created site
 */
const createSite = async () => {
    const client = await pool.connect();
    try {
        const newSiteId = uuidv4();
        const query = `INSERT INTO site (site_id) VALUES ($1);`;
        await client.query(query, [newSiteId]);
        return newSiteId;
    } catch (err) {
        throw Error(err.stack);
    } finally {
        client.release();
    }
};

/**
 * Returns a list of all existing sites in the database
 * @returns {Promise} Promise object represents the list of all site_ids
 */
const getAllSites = async () => {
    const client = await pool.connect();
    const query = `SELECT * FROM site`;

    try {
        const res = await client.query(query);
        return res.rows.map((site) => {
            return site.site_id;
        });
    } catch (error) {
        throw Error(err.stack);
    } finally {
        client.release();
    }
};

/**
 * Deletes the site and its materials from the database with the given siteId
 * @param {uuid} siteId
 * @returns {Promise} Promise object represents the status of the deletion
 */
const deleteSite = async (siteId) => {
    const client = await pool.connect();

    let query = `DELETE FROM site WHERE site_id = $1`;

    try {
        const res = await client.query(query, [siteId]);
        if (res.rowCount === 1) {
            query = "DELETE FROM materials WHERE site_id = $1";
            await client.query(query, [siteId]);
            return `Site with id ${siteId} deleted`;
        } else {
            return `Site with id ${siteId} does not exists`;
        }
    } catch (error) {
        throw Error(err.stack);
    } finally {
        client.release();
    }
};

module.exports = { createSite, deleteSite, getAllSites };
