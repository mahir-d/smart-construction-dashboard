const pool = require("./connection");
const { v4: uuidv4 } = require("uuid");

/**
 * Creates a new site with a unique uuid
 * @returns string
 */
const createSite = async () => {
    const newSiteId = uuidv4();

    const client = await pool.connect();
    const query = `INSERT INTO site1 (site_id) VALUES ($1);`;

    try {
        await client.query(query, [newSiteId]);
        return `Site ${newSiteId} is successfully created`;
    } catch (err) {
        throw Error(err.stack);
    }
};

/**
 * Deletes the site and its materials from the database with the given siteId
 * @param {uuid} siteId
 * @returns
 */
const deleteSite = async (siteId) => {
    const client = await pool.connect();

    const query = `DELETE FROM site1 WHERE site_id = '${siteId}'`;

    try {
        const res = await client.query(query);
        if (res.rowCount === 1) {
            return `Site with id ${siteId} deleted`;
        } else {
            return `Site with id ${siteId} does not exists`;
        }
    } catch (error) {
        throw Error(err.stack);
    }
};

module.exports = { createSite, deleteSite };
