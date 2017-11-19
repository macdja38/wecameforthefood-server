const express = require("express");
const api = require("./api");
const bodyParser = require('body-parser');
const r = require("./db");

const app = express();
// parse application/json
app.use(bodyParser.json());

// during testing allow all origins
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api", api);

app.listen(3000, () => console.log('Example app listening on port 3000!'));

setInterval(() => {
  r.db("test").table("list").filter(i => i("expire").le(r.now())).delete().run();
}, 5000);