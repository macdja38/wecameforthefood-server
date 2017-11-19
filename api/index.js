const routes = require('express').Router();
const list = require('./list');
const item = require('./item');

routes.use('/item', item);
routes.use('/list', list);

module.exports = routes;