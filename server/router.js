/**
 * @module router
 * @param {module} router - instance of Express.Router
 * @param {module} controller - instance of Controller middleware
 * @param {module} resHandler - instance of responsHandler middleware
 * @return taskRouter - instance of Express.Router, with routes
 */

 const express = require('express');
 const router = express.Router();
 const resHandler = require('./resHandler');
 const controller = require('./controller');

 // module.exports = (museumRouter, controller, resHandler) => {


  router.route('/:userid/faves/:favesid')
    // React sends user_id, favesid
    .delete(controller.delFaves, resHandler.handleDel)

  router.route('/:userid/faves')
    // React sends commentid, comment, rating
    // get faves list
    .get(controller.getAllFaves, controller.getUser, resHandler.sendJSON)
    // change, update, edit comment
    .put(controller.updateComment, resHandler.sendJSON)

  router.route('/museum/:museumid')
    // React sends user_id, comment, rating
    // check if you favorited the museum
    .get(controller.getFave, resHandler.sendJSON)
    // add comment to museum
    .post(controller.createComment, resHandler.sendJSON);
    // MISSING adding a museum to favorites
    // hits db to update the museum's status of fave or to change a comment

    // I started to write the put route for you, but you can finish it

    .put(controller., resHandler.sendJSON)


//this get route will need access to user id included in endpoint
//because of the way the isItAFave function is currently set up
//to require input of user_id (because since it's a get route and not
//a post route there's no other way to get the user_id in there)
  router.route('/search')
    // React sends museum_id
    // get fave (checks to see if you favorited museum)
    .get(controller.isItAFave);

  // router.use(resHandler.throwError);

  module.exports = router;


  // return router;

 // };











