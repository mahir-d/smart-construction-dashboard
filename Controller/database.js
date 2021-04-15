var express = require("express");
var router = express.Router();
const dbFunctions = require("../Model/dbFunctions");

router.get("/createtable/:tablename", async (req, res) => {
    try {
        const tableName = req.params.tablename;
        const status = await dbFunctions.createTable(tableName);
        res.status(200).json({ Success: status });
    } catch (e) {
        res.status(400).json({ Error: e.message });
    }
});

module.exports = router;
