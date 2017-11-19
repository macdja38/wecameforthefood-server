const routes = require('express').Router();
const list = require('./list');
const item = require('./item');
const status = require('./status');

routes.use('/item', item);
routes.use('/list', list);
routes.use('/status', status);

module.exports = routes;