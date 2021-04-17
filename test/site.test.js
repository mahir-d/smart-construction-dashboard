const assert = require("assert");
const dbSiteFunctions = require("../Model/site");
const { Pool } = require("pg");
require("dotenv").config();

beforeEach(() => {
    //Set node env to testing
    console.log(process.env.NODE_ENV);
});

test("two plus two is four", () => {
    console.log(process.env.NODE_ENV);
    expect(2 + 2).toBe(4);
});
