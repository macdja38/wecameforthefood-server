const routes = require('express').Router();

const r = require("../../db");

routes.get('/', (req, res) => {
  r.db("test").table("list").run().then((list) => {

    let costPerMSTotal = list.reduce((total, item) => {
      let start = Date.parse(item.added);
      let end = Date.parse(item.expire);

      let time = end - start;
      let costPerms = item.price / time;
      return total + costPerms;
    }, 0);

    console.log(costPerMSTotal);

    let monthCost = costPerMSTotal * 1000 * 60 * 60 * 24 * 28;
    let yearCost = costPerMSTotal * 1000 * 60 * 60 * 24 * 365;

    res.send({month: monthCost, year: yearCost});
  });
});

module.exports = routes;