const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const cors = require("cors");
var routes = require("./Controller/index");
const port = process.env.PORT;
require("dotenv").config();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Smart Construction Dashboard API",
            description:
                "CRUD API documentaion for the smart construction dashboard",
            contact: {
                name: "Mahir Dhall",
                email: "mdhall@stevens.edu",
            },
            servers: [`http://localhost:${port}`],
        },
    },
    apis: ["./Controller/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
// app.use(cors);
app.use("/", routes);
app.use("/*", async (req, res) => {
    res.status(404).json({ Error: "Route not found" });
});

module.exports = app;
