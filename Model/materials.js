/**
 * This file contains functions to create, read, update and delete materials
 * in the database
 */

const pool = require("./connection");
const { v4: uuidv4 } = require("uuid");

/**
 * Returns an array of objects, representing all the materials for a give siteId
 * @param {uuid} siteId
 * @returns {Promise} Promise object represents the list of all materials
 */
const getMaterials = async (siteId) => {
    const client = await pool.connect();
    const query = `SELECT * FROM materials WHERE site_id = $1;`;

    try {
        const res = await client.query(query, [siteId]);

        return res.rows;
    } catch (error) {
        throw Error(error.stack);
    } finally {
        client.release();
    }
};

/**
 * Returns the total cost of all materials for a given site
 * @param {uuid} siteId
 * @returns {Promise} Promise object represents the cost of all materials
 */
const getCost = async (siteId) => {
    const client = await pool.connect();
    try {
        const query = `SELECT sum(cost * volume) FROM materials WHERE site_id = $1;`;
        const res = await client.query(query, [siteId]);

        return res.rows[0]["sum"];
    } catch (error) {
        throw Error(error.stack);
    } finally {
        client.release();
    }
};

/**
 * Creates a new material with the given paramters
 * @param {uuid} siteId
 * @param {string} name
 * @param {float} volume
 * @param {float} cost
 * @param {string} color
 * @param {date} deliveryDate
 * @returns {Promise} Promise object represents the id of the new material
 */
const createMaterial = async (
    siteId,
    name,
    volume,
    cost,
    color,
    deliveryDate
) => {
    const client = await pool.connect();
    try {
        const newMaterialId = uuidv4();

        const query = `INSERT INTO materials (site_id, material_id, name, volume, cost, color,delivery_date) VALUES ($1, $2, $3, $4, $5,$6,$7);`;
        await client.query(query, [
            siteId,
            newMaterialId,
            name,
            volume,
            cost,
            color,
            deliveryDate,
        ]);
        return newMaterialId;
    } catch (error) {
        throw Error(error.stack);
    } finally {
        client.release();
    }
};

/**
 * Updates the material with the given parameter in the database
 * @param {uuid} siteId
 * @param {uuid} materialId
 * @param {string} name
 * @param {Float} volume
 * @param {Float} cost
 * @param {string} color
 * @param {date} deliveryDate
 * @returns {Promise} Promise object represents the status of the update
 */
const updateMaterial = async (
    siteId,
    materialId,
    name,
    volume,
    cost,
    color,
    deliveryDate
) => {
    const client = await pool.connect();
    try {
        const query = `UPDATE materials SET name = $1, volume = $2, cost=$3, color = $4, delivery_date = $5 WHERE site_id = $6 and material_id = $7;`;
        await client.query(query, [
            name,
            volume,
            cost,
            color,
            deliveryDate,
            siteId,
            materialId,
        ]);
        return `Material with id ${materialId} successfully updated for site ${siteId} `;
    } catch (error) {
        throw Error(error.stack);
    } finally {
        client.release();
    }
};

/**
 * Deletes the  materials from the database with the given siteId and materialId
 * @param {uuid} siteId
 * @param {uuid} materialId
 * @returns {Promise} Promise object represents the status of the deletion
 */
const deleteMaterial = async (siteId, materialId) => {
    const client = await pool.connect();
    try {
        const query = `DELETE FROM materials WHERE site_id = $1 and material_id = $2;`;
        const res = await client.query(query, [siteId, materialId]);

        if (res.rowCount == 1) {
            return `Material with id ${materialId} successfully deleted for site ${siteId} `;
        } else {
            return `Material with id ${materialId} does not exists for site ${siteId} `;
        }
    } catch (error) {
        throw Error(error.stack);
    } finally {
        client.release();
    }
};

module.exports = {
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterials,
    getCost,
};
