const dbFunctions = require("../Model/dbFunctions");
const dbSiteFunctions = require("../Model/site");
const dbMaterialFunctions = require("../Model/materials");
const uuidv4 = require("uuid");
const pool = require("../Model/connection");
require("dotenv").config();

beforeAll(async () => {
    // console.log(`NODE_ENV changed to ${process.env.NODE_ENV}`);
    await dbFunctions.createDatabase(process.env.PGTESTDATABASE);

    // console.log(`Created New database ${process.env.PGTESTDATABASE}`);
});

test("Tests Table creation: ", async () => {
    const res1 = await dbFunctions.createTable("site");
    expect(res1).toBe("Table site is successfully created");
    const res2 = await dbFunctions.createTable("materials");
    expect(res2).toBe("Table materials is successfully created");
});

test("Tests table creation when already existing", async () => {
    const res1 = await dbFunctions.createTable("site");
    expect(res1).toBe("Table site already exists!");
    const res2 = await dbFunctions.createTable("materials");
    expect(res2).toBe("Table materials already exists!");
});

describe("Tests create, read and delete backend function for a site", () => {
    let res = "";
    test("Tests create site function: ", async () => {
        res = await dbSiteFunctions.createSite();
        expect(uuidv4.validate(res)).toBeTruthy();
    });

    test("Tests the deletion of a site: ", async () => {
        const status = await dbSiteFunctions.deleteSite(res);
        expect(status).toBe(`Site with id ${res} deleted`);
    });

    test("Tests the deletion of a non exisiting site: ", async () => {
        const status = await dbSiteFunctions.deleteSite(res);
        expect(status).toBe(`Site with id ${res} does not exists`);
    });

    describe("Tests fetching of the list of sites: ", () => {
        let sitesArr = [];
        beforeEach(async () => {
            let newSiteId = await dbSiteFunctions.createSite();
            sitesArr.push(newSiteId);
            newSiteId = await dbSiteFunctions.createSite();
            sitesArr.push(newSiteId);
        });

        test("Tests the get sites function: ", async () => {
            let siteList = await dbSiteFunctions.getAllSites();
            siteList = new Set(siteList);
            expect(siteList).toContain(sitesArr[0]);
            expect(siteList).toContain(sitesArr[1]);
            expect(siteList.size).toBe(2);
        });
    });
});

describe("Tests Create, read, update and delete functions for materials: ", () => {
    let sitesArr = [];
    beforeAll(async () => {
        let newSiteId = await dbSiteFunctions.createSite();
        sitesArr.push(newSiteId);
        newSiteId = await dbSiteFunctions.createSite();
        sitesArr.push(newSiteId);
    });

    const materialObj1 = {
        name: "sand",
        volume: 1000,
        cost: 9,
        color: "yellow",
        deliveryDate: "12/03/2021",
    };

    const materialObj2 = {
        name: null,
        volume: 400,
        cost: 23,
        color: "green",
        deliveryDate: null,
    };

    const materialObj3 = {
        name: "wood",
        volume: null,
        cost: 904,
        color: "brown",
        deliveryDate: "12/03/2021",
    };

    let materialArr = [];
    test("Tests creating new materials for a given site: ", async () => {
        const res1 = await dbMaterialFunctions.createMaterial(
            sitesArr[0],
            materialObj1.name,
            materialObj1.volume,
            materialObj1.cost,
            materialObj1.color,
            materialObj1.deliveryDate
        );

        expect(uuidv4.validate(res1)).toBeTruthy();

        materialArr.push(res1);
    });

    test("Tests creating new materials with optional parameters", async () => {
        const res2 = await dbMaterialFunctions.createMaterial(
            sitesArr[0],
            materialObj2.name,
            materialObj2.volume,
            materialObj2.cost,
            materialObj2.color,
            materialObj2.deliveryDate
        );
        expect(uuidv4.validate(res2)).toBeTruthy();
        materialArr.push(res2);
    });

    test("Tests fetching all materials for a given site: ", async () => {
        const res = await dbMaterialFunctions.getMaterials(sitesArr[0]);
        expect(res.length).toBe(2);

        expect(res[1]).toMatchObject({
            color: "green",
            cost: "$23.00",
            delivery_date: null,
            material_id: materialArr[1],
            name: null,
            site_id: sitesArr[0],
            volume: 400,
        });
    });

    test("Tests updating a material function: ", async () => {
        const res = await dbMaterialFunctions.updateMaterial(
            sitesArr[0],
            materialArr[1],
            "Test Material",
            600,
            50,
            "blue",
            null
        );
        expect(res).toBe(
            `Material with id ${materialArr[1]} successfully updated for site ${sitesArr[0]} `
        );
    });

    test("Tests getting total material cost for a site", async () => {
        const cost = await dbMaterialFunctions.getCost(sitesArr[0]);
        expect(cost).toBe("$39,000.00");
    });

    test("Tests deletion of a material from the given site", async () => {
        const res = await dbMaterialFunctions.deleteMaterial(
            sitesArr[0],
            materialArr[0]
        );
        expect(res).toBe(
            `Material with id ${materialArr[0]} successfully deleted for site ${sitesArr[0]} `
        );
    });

    test("Tests deletion of a non exisitng material", async () => {
        const res = await dbMaterialFunctions.deleteMaterial(
            sitesArr[0],
            materialArr[0]
        );
        expect(res).toBe(
            `Material with id ${materialArr[0]} does not exists for site ${sitesArr[0]} `
        );
    });
});
test("Tests Table deletion: ", async () => {
    const res1 = await dbFunctions.deleteTable("site");
    expect(res1).toBe("Table site is successfully deleted");
    const res2 = await dbFunctions.deleteTable("materials");
    expect(res2).toBe("Table materials is successfully deleted");
});

test("Tests Table deletion for non existing tables: ", async () => {
    const res1 = await dbFunctions.deleteTable("site");
    expect(res1).toBe("Table site does not exists");
    const res2 = await dbFunctions.deleteTable("materials");
    expect(res2).toBe("Table materials does not exists");
});

afterAll(async () => {
    // or this:
    pool.end().then(() => console.log("pool has ended"));
});
