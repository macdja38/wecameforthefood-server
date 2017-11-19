const routes = require('express').Router();
const r = require("../../db");
const chrono = require("chrono-node");

routes.post('/', (req, res) => {
  console.log("Got a request");
  console.log(req.body);

  const item = Object.assign({}, req.body);

  item.expire = r.epochTime(chrono.parseDate(`in ${req.body.expire}`, Date.now()).getTime() / 1000);

  r.db("test").table("list").insert(item).then(result => {
    console.log(result);
    if (result.inserted === 1) {
      res.send({id: result.generated_keys[0]});
    } else {
      res.sendStatus(519);
    }
  });
});

routes.delete('/', (req, res) => {
  console.log("Got a request");
  console.log(req.body);

  res.send("success");
  r.db("test").table("list").get(req.body.id).delete().then(result => {
    console.log(result);
    if (result.deleted === 1) {
      res.send(result);
    } else {
      res.sendStatus(519);
    }
  });
});

module.exports = routes;