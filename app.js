const express = require("express");
const app = express();
const port = 3000;

var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({ Message: "Hello world!" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
