/**
 * This is the test file for testing the express API routes
 */
require("dotenv").config();

const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const dbFunctions = require("../Model/dbFunctions");
const uuidv4 = require("uuid");
const pool = require("../Model/connection");
const dbSiteFunctions = require("../Model/site");

beforeAll(async () => {
    await dbFunctions.createDatabase(process.env.PGTESTDATABASE);
    const res1 = await dbFunctions.createTable("site");
    const res2 = await dbFunctions.createTable("materials");
});

describe("Tests CRUD routes for site", () => {
    let siteArr = [];
    test("Tests /site/createsite to create a new site in the database ", async () => {
        const res = await request.get("/site/createsite");
        expect(res.statusCode).toBe(200);
        expect(uuidv4.validate(res.body.data)).toBeTruthy();
        siteArr.push(res.body.data);
    });

    test("Tests /site/ route to get list of all sites in the db", async () => {
        const res = await request.get("/site/");
        expect(res.statusCode).toBe(200);
        expect(new Set(res.body.data)).toContain(siteArr[0]);
    });

    test("Tests /site/deletesite route to delete an existing site", async () => {
        const res = await request
            .delete("/site/deletesite")
            .send({ siteId: siteArr[0] })
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
    });

    test("Tests /site/deletesite route to delete a non existing site", async () => {
        const res = await request
            .delete("/site/deletesite")
            .send({ siteId: siteArr[0] })
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe(
            `Site with id ${siteArr[0]} does not exists`
        );
    });

    test("Tests /site/deletesite route with invalid siteId", async () => {
        const res = await request
            .delete("/site/deletesite")
            .send({ siteId: "invalid uuid" })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a valid siteId to delete");
    });
});

describe("Tests CRUD routes for materials", () => {
    let sitesArr = [];
    let materialsArr = [];
    beforeAll(async () => {
        let newSiteId = await dbSiteFunctions.createSite();
        sitesArr.push(newSiteId);
        newSiteId = await dbSiteFunctions.createSite();
        sitesArr.push(newSiteId);
    });

    test("Tests Creating new material for given siteId", async () => {
        const res = await request
            .post("/materials")
            .send({
                siteId: sitesArr[0],
                name: "sand",
                volume: 1000,
                cost: 9,
                color: "yellow",
                deliveryDate: "12/03/2021",
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(200);
        expect(uuidv4.validate(res.body.data)).toBeTruthy();
        materialsArr.push(res.body.data);
    });

    test("Tests Creating new material for given siteId with invalid siteId", async () => {
        const res = await request
            .post("/materials")
            .send({
                siteId: "12324",
                name: "sand",
                volume: 1000,
                cost: 9,
                color: "yellow",
                deliveryDate: "12/03/2021",
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a valid siteId");
    });

    test("Tests Creating new material for given siteId with invalid volume", async () => {
        const res = await request
            .post("/materials")
            .send({
                siteId: sitesArr[0],
                name: "sand",
                volume: -10,
                cost: 9,
                color: "yellow",
                deliveryDate: "12/03/2021",
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a volume for the material");
    });

    test("Tests Creating new material for given siteId with invalid cost", async () => {
        const res = await request
            .post("/materials")
            .send({
                siteId: sitesArr[0],
                name: "sand",
                volume: 100,
                cost: -9,
                color: "yellow",
                deliveryDate: "12/03/2021",
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a cost for the material");
    });

    test("Tests Creating new material for given siteId with invalid color", async () => {
        const res = await request
            .post("/materials")
            .send({
                siteId: sitesArr[0],
                name: "sand",
                volume: 100,
                cost: 9,
                color: null,
                deliveryDate: "12/03/2021",
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a color for the material");
    });

    test("Tests updating given material for given siteId", async () => {
        const res = await request
            .put("/materials")
            .send({
                siteId: sitesArr[0],
                materialId: materialsArr[0],
                name: "test material",
                volume: "600",
                cost: 50,
                color: "blue",
                delivery_data: null,
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe(
            `Material with id ${materialsArr[0]} successfully updated for site ${sitesArr[0]} `
        );
    });

    test("Tests updating given material for given invalid id", async () => {
        const res = await request
            .put("/materials")
            .send({
                siteId: "invalidid",
                materialId: materialsArr[0],
                name: "test material",
                volume: "600",
                cost: 50,
                color: "blue",
                delivery_data: null,
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a valid siteId to update");
    });

    test("Tests updating given material with invalid materialId", async () => {
        const res = await request
            .put("/materials")
            .send({
                siteId: sitesArr[0],
                materialId: "124325dwgfvw",
                name: "test material",
                volume: "600",
                cost: 50,
                color: "blue",
                delivery_data: null,
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe(
            "Please provide a valid materialId to update"
        );
    });

    test("Tests updating given material with invalid volume", async () => {
        const res = await request
            .put("/materials")
            .send({
                siteId: sitesArr[0],
                materialId: materialsArr[0],
                name: "test material",
                volume: null,
                cost: 50,
                color: "blue",
                delivery_data: null,
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe(
            "Please provide a valid volume for the material"
        );
    });

    test("Tests updating given material with invalid cost", async () => {
        const res = await request
            .put("/materials")
            .send({
                siteId: sitesArr[0],
                materialId: materialsArr[0],
                name: "test material",
                volume: 600,
                cost: -65,
                color: "blue",
                delivery_data: null,
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe(
            "Please provide a valid cost for the material"
        );
    });

    test("Tests updating given material with invalid cost", async () => {
        const res = await request
            .put("/materials")
            .send({
                siteId: sitesArr[0],
                materialId: materialsArr[0],
                name: "test material",
                volume: 600,
                cost: 50,
                color: null,
                delivery_data: null,
            })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a color for the material");
    });

    test("Tests fetching the total cost for a given site", async () => {
        const res = await request.get(`/materials/cost/${sitesArr[0]}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe("$30,000.00");
    });

    test("Tests fetching the total cost for an invalid id", async () => {
        const res = await request.get(`/materials/cost/invalidid`);
        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a valid siteId");
    });

    test("Tests fetching materials for a given site", async () => {
        const res = await request.get(`/materials/${sitesArr[0]}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0]).toMatchObject({
            color: "blue",
            cost: "$50.00",
            delivery_date: null,
            material_id: materialsArr[0],
            name: "test material",
            site_id: sitesArr[0],
            volume: 600,
        });
    });

    test("Tests fetching materials for a given site with invalid id: ", async () => {
        const res = await request.get(`/materials/invalidid`);
        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a valid siteId");
    });

    test("Tests deleting a given material for the given siteId", async () => {
        const res = await request
            .delete("/materials/")
            .send({ siteId: sitesArr[0], materialId: materialsArr[0] })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe(
            `Material with id ${materialsArr[0]} successfully deleted for site ${sitesArr[0]} `
        );
    });
    test("Tests deleting a given material for the invalid siteId", async () => {
        const res = await request
            .delete("/materials/")
            .send({ siteId: "sfgsgsb", materialId: materialsArr[0] })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe("Please provide a valid siteId to delete");
    });

    test("Tests deleting a given material for the invalid materialId", async () => {
        const res = await request
            .delete("/materials/")
            .send({ siteId: sitesArr[0], materialId: "skjvbsdkvb" })
            .set("Accept", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.Error).toBe(
            "Please provide a valid materialId to delete"
        );
    });
});

afterAll(async () => {
    await dbFunctions.deleteTable("site");
    await dbFunctions.deleteTable("materials");
    pool.end();
});
