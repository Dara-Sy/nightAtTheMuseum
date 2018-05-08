model.exports = museumDB => {
  async getAllFaves(req, res, next) {
    // hit the db to get favorites list
    try {
      req.body.favesid = req.params.favesid;
      res.local.museums = await museumDB.getAllFaves(req.session.user.favesid);
      next();
    } catch (e) {
      next(e);
    }
  },

  async getFave(req, res, next) {
    // checks db to see if you favorited this museum
    try {
      res.locals.museum = await museumDB.getOne(req.session.user.favesid);
      next();
    } catch (e) {
      next(e);
    }
  },

  async createFave(req, res, next) {
    // hits db to add comment to museum (faves table)
    try {
      let theData = req.body;
      theData.favesid = req.session.user.favesid;
      res.locals.museum = await museumDB.create(theData);
      next();
    } catch (e) {
      next(e);
    }
  },

  async updateFave(req, res, next) {
    // hit the db to change comment
    try {
      // insert something to do here
      // we need to update something
      next();
    } catch (e) {
      next(e);
    }
  },

  async delFave(req, res, next) {
    // hit the db to unfavorite something
    try {
      // passing 1 thing with 2 keys
      let req = {
        params: {
          favid: 'something',
          userid: 1,
        }
      }
      // passing 2 things with 2 keys
      // req.body.faveid = req.params.faveid;
      // req.body.userid = req.params.userid;

      res.locals.museum = await museumDB.destroy(req.params);
      next();
    } catch (e) {
      next(e);
    }
  }

  async isItAFave(req, res, next) {
    try {
      let theData = {
        faves_id: req.body.faveid,
        user_id: req.body.userid,
        museum_id: parseInt(req.body.museum_id)
      }
      let fave = req.body.faveid;

      if (fave === 'true') {
        fave = !!fave;
      } else {
        fave = !fave;
      }
        theData.fave = fave;
        res.locals.museum = await museumDB.isItAFave(req.body);
        next();
      } catch (e) {
        next(e);
    }
  },

  async toggle(req, res, next) {

  }

});



// let req = {
//         body: {
//           favid: 'something',
//           userid: 1,
//         },
//         session: {

//         },



