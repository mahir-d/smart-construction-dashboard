const pool = require("./connection");
const { v4: uuidv4 } = require("uuid");

const getMaterials = async (siteId) => {
    const client = await pool.connect();
    const query = `SELECT * FROM materials WHERE site_id = $1;`;

    try {
        const res = await client.query(query, [siteId]);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        throw Error(error.stack);
    }
};

const getCost = async (siteId) => {
    const client = await pool.connect();

    const query = `SELECT sum(cost) FROM materials WHERE site_id = $1;`;

    try {
        const res = await client.query(query, [siteId]);

        return res.rows[0]["sum"];
    } catch (error) {
        throw Error(error.stack);
    }
};

const createMaterial = async (materialObj) => {
    const { siteId, name, volume, cost, color, deliveryDate } = materialObj;

    const newMaterialId = uuidv4();

    const client = await pool.connect();
    const query = `INSERT INTO materials (site_id, material_id, name, volume, cost, color,delivery_date) VALUES ($1, $2, $3, $4, $5,$6,$7);`;

    try {
        await client.query(query, [
            siteId,
            newMaterialId,
            name,
            volume,
            cost,
            color,
            deliveryDate,
        ]);
        return `New material with id ${newMaterialId} successfully added to ${siteId} `;
    } catch (err) {
        throw Error(err.stack);
    }
};

const updateMaterial = async (materialObj) => {
    const {
        siteId,
        materialId,
        name,
        volume,
        cost,
        color,
        deliveryDate,
    } = materialObj;

    const client = await pool.connect();
    const query = `UPDATE materials SET name = $1, volume = $2, cost=$3, color = $4, delivery_date = $5 WHERE site_id = $6 and material_id = $7;`;

    try {
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
    } catch (err) {
        throw Error(err.stack);
    }
};

const deleteMaterial = async (materialObj) => {
    const { siteId, materialId } = materialObj;
    const client = await pool.connect();
    const query = `DELETE FROM materials WHERE site_id = $1 and material_id = $2;`;

    try {
        const res = await client.query(query, [siteId, materialId]);
        console.log(res.rowCount);
        return `Material with id ${materialId} successfully deleted for site ${siteId} `;
    } catch (err) {
        throw Error(err.stack);
    }
};

module.exports = {
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterials,
    getCost,
};
