require("dotenv").config();
const dbSiteFunctions = require("./Model/site");
const dbFunctions = require("./Model/dbFunctions");
const seedData = require("./seedData");
const dbMaterialFunctions = require("./Model/materials");

/**
 * Seeds the Prod Database with the given data
 */
const seedDataProdDb = async () => {
    let sitesArr = [];
    try {
        for (let i = 0; i < 5; i++) {
            const siteId = await dbSiteFunctions.createSite();
            sitesArr.push(siteId);
        }

        for (const siteId of sitesArr) {
            for (const material of seedData) {
                let idx = Math.floor(Math.random() * 10);

                const materialObj = seedData[idx];

                const status = await dbMaterialFunctions.createMaterial(
                    siteId,
                    materialObj.name,
                    materialObj.volume,
                    materialObj.cost,
                    materialObj.color,
                    materialObj.deliveryDate
                );
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const seed = async () => {
    console.log("Seeding the database");
    await dbFunctions.createDatabase(process.env.PGDATABASE);
    await dbFunctions.deleteTable("site");
    await dbFunctions.deleteTable("materials");
    await dbFunctions.createTable("site");
    await dbFunctions.createTable("materials");
    await seedDataProdDb();
    console.log("Database seeded");
};

seed().then(() => {
    process.exit();
});
