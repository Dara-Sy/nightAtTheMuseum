const museumDB = require('./models');

module.exports = {

  // we did not review adding user function
  // so I commented it out for now

  // async addUser(req, res, next) {
  //   try{
  //     res.locals.user = await museumDB.addUser();
  //     res.locals.user.password_digest = '';
  //     next();
  //   } catch (e) {
  //     next(e);
  //   }
  // },

  async getUser(req, res, next) {
    try{
      res.locals.user = await museumDB.findOneUser(res.locals.payload.username);
      res.locals.user.password_digest = '';
      next();
    } catch (e) {
      next(e);
    }
  },

  async getAllFaves(req, res, next) {
    // hit the db to get favorites list
    try {
      // passing 1 thing, favesid
      // listing all the faves
      res.locals.museums = await museumDB.getAllFaves(parseInt(req.params.userid));
      next();
    } catch (e) {
      next(e);
    }
  },

  // user_id, comment, rating


  async getFave(req, res, next) {
    // checks db to see if you favorited this museum
    try {
      // passing 1 thing, museumid
      res.locals.museum = await museumDB.getOneFave(parseInt(req.params.museumid));
      next();
    } catch (e) {
      next(e);
    }
  },


  // POST with route '/museum/:museumid'
  // adding a comment to museum
  // adds to faves table
  async createComment(req, res, next) {
    // hits db to add comment to museum (faves table)
    try {
      // we are creating a comment through the route at ('/museum/:museumid')
      // passing 1 thing, data
      // not sure how req.params syntax should be
      res.locals.museum = await museumDB.create(parseInt(req.params.museumid, req.body));
      next();
    } catch (e) {
      next(e);
    }
  },

  // the route is '/:userid/faves'
  // editing a comment
  async updateComment(req, res, next) {
    // hit the db to change comment
    try {
     // passing 1 thing, data
     // not sure how req.params should be

      res.locals.museum = await museumDB.updateComment(parseInt(req.params.userid, req.body));
      next();
    } catch (e) {
      next(e);
    }
  },

  async delFave(req, res, next) {
    // hit the db to unfavorite something
    try {
      // unfavoriting a museum


      // passing 2 things, userid and favesid
      res.locals.museum = await museumDB.destroy(parseInt(req.params.userid), parseInt(req.params.favesid));
      next();
    } catch (e) {
      next(e);
    }
  },

  async isItAFave(req, res, next) {
    try {
        // does the museum id exist next to the user id name
        // in the same row?
        // find one
        // if return back data
        // conditional stmt inside the then
        // console.log("this is req.params:", req.params);
       data = await museumDB.getOneFave(2)
       console.log("this is data", data);
          // let res.locals.museum = d;
          // show the favorites

          // res.send('Is it a Fave:' + data.favesid)
          next();
        })
          .catch (e => {
            next(e);
        })

    }
  };


