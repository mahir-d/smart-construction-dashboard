/**
 * This file contains logic to start a local development server
 */
const app = require("./app");
require("dotenv").config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(
        `Smart Construction Dashboard app listening at http://localhost:${port}`
    );
});
