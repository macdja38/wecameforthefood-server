const express = require("express");
const api = require("./api");
const bodyParser = require('body-parser');

const app = express();
// parse application/json
app.use(bodyParser.json());

app.use("/api", api);

app.listen(3000, () => console.log('Example app listening on port 3000!'));