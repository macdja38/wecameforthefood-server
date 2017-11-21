const routes = require('express').Router();

const r = require("../../db");

routes.get('/', (req, res) => {
  r.table("list").run().then((list) => {
    res.send(list);
  });
});

module.exports = routes;