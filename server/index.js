module.exports = (db) => {
  const router        = require('express').Router();
  const resHandler    = require('./resHandler');
  const museumDB      = require('./models')(db);
  const controller    = require('./controller')(museumDB);
  const museumRouter  = require('./router');

  // return the configured museum router
  return museumRouter(router, contoller, resHandler);
};
