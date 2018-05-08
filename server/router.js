/**
 * @module router
 * @param {module} router - instance of Express.Router
 * @param {module} controller - instance of Controller middleware
 * @param {module} resHandler - instance of responsHandler middleware
 * @return taskRouter - instance of Express.Router, with routes
 */

 module.exports = (router, controller, resHandler) => {
  //

  router.route('/:userid/faves/:favesid')
    // React sends user_id, favesid
    .delete(controller.delFaves, resHandler.)

  router.route('/:userid/faves')
    // React sends commentid, comment, rating
    // get faves list
    .get(controller.getAllFaves, resHandler.)
    // change comment
    .put(controller.updateComment, resHandler.)

  router.route('/museum/:museumid')
    // React sends user_id, comment, rating
    // check if you favorited the museum
    .get(controller.getFave, resHandler.)
    // add comment to museum
    .post(controller.createComment, resHandler.);

  router.route('/search')
    // React sends museum_id
    // get fave (checks to see if you favorited museum)
    .get(controller.isItAFave, resHandler.sendJSON);

  router.use(resHandler.send404);
  return router;

 };











