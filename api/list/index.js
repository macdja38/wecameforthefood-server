const routes = require('express').Router();

const r = require("../../db");

routes.get('/', (req, res) => {
  r.db("test").table("list").run().then((list) => {
    res.send(list);
  });
});

module.exports = routes;