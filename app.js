const express = require("express");
const app = express();
const port = 3001;
var index = require("./Controller/index");
require("dotenv").config();

app.use("/", index);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
