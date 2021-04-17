const express = require("express");
const app = express();
const port = 3001;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
var routes = require("./Controller/index");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Smart Construction Dashboard API",
            description:
                "Information related to the smart Dashboard and its routes",
            contact: {
                name: "Mahir Dhall",
                email: "mdhall@stevens.edu",
            },
            servers: [`http://localhost:${port}`],
            paths: {
                "/site": {
                    get: {
                        description:
                            "To fetch all Construction_sites in the database",
                        tags: ["Site API"],
                    },
                },
                "/site/createsite": {
                    get: {
                        description: "Creates a new site with an unique uuid",
                        tags: ["Site API"],
                    },
                },

                "/deletesite": {
                    delete: {
                        description:
                            "deletes a site and all its materials with the given uuid",
                        tags: ["Site API"],
                    },
                },
            },
        },
    },
    apis: ["./Controller/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

require("dotenv").config();

app.use(express.json());
// app.use(cors);
app.use("/", routes);

module.exports = app;
