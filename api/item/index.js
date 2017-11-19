const routes = require('express').Router();
const r = require("../../db");
const chrono = require("chrono-node");

routes.post('/', (req, res) => {
  console.log("Got a request");
  console.log(req.body);

  const originalItem = req.body.expire;

  const item = {};

  try {
    item.expire = r.epochTime(chrono.parseDate(`in ${originalItem.expire}`, Date.now()).getTime() / 1000)
  } catch (error) {
    res.status(400).send("Invalid expire format, try \"1 day\"");
    return;
  }

  item.size = parseInt(originalItem.size, 10);
  if (isNaN(item.size) || item.size === 0) {
    res.status(400).send("Invalid size, please send a valid non-zero number, eg: 10");
    return;
  }

  item.price = parseInt(originalItem.price, 10);
  if (isNaN(item.price) || item.price === 0) {
    res.status(400).send("Invalid price, please send a valid non-zero number, eg: 5");
    return;
  }

  item.name = originalItem.name;
  if (typeof item.name !== "string" || item.name === "") {
    res.status(400).send("Invalid name, please send a string with content, eg bagel");
    return;
  }

  // r.db("test").table("list").sum("size").add(5).gt(80000).branch(false, r.db("test").table("list").insert(r.db("test").table("list").get("73b21891-cd97-4e83-b1c2-8f9b10904020").without("id")));

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