const app = require("./app");
const port = 3001;
app.listen(port, () => {
    console.log(
        `Smart Construction Dashboard app listening at http://localhost:${port}`
    );
});
