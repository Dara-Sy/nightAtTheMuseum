const museumDB = require('./models');

module.exports = {
  async getAllFaves(req, res, next) {
    // hit the db to get favorites list
    try {
      // req.body.favesid = req.params.favesid;
      // Where are you getting faves id from?
      res.local.museums = await museumDB.getAllFaves(parseInt(req.params.userid));
      next();
    } catch (e) {
      next(e);
    }
  },

  // user_id, comment, rating

  async getFave(req, res, next) {
    // checks db to see if you favorited this museum
    try {
      res.locals.museum = await museumDB.getOneFave(parseInt(req.params.museumid));
      next();
    } catch (e) {
      next(e);
    }
  },

  async createComment(req, res, next) {
    // hits db to add comment to museum (faves table)
    try {
      res.locals.museum = await museumDB.createComment(req.body);
      next();
    } catch (e) {
      next(e);
    }
  },

  async updateComment(req, res, next) {
    // hit the db to change comment
    try {
      res.locals.museum = await museumDB.updateComments(req.body);
      next();
    } catch (e) {
      next(e);
    }
  },

  async delFaves(req, res, next) {
    // hit the db to unfavorite something
    try {
      // passing 1 thing with 2 keys userid and favesid
      res.locals.museum = await museumDB.destroy(req.params);
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
      res.locals.museum = await museumDB.getOneFave(req.body.museum_id);
        next();
    } catch (e) {
        next(e);
    }

  }

};




  // async toggle(req, res, next) {

  // }





// let req = {
//         body: {
//           favid: 'something',
//           userid: 1,
//         },
//         session: {

//         },



 // async delFave(req, res, next) {
 //    // hit the db to unfavorite something
 //    try {
 //      // passing 1 thing with 2 keys
 //      let req = {
 //        params: {
 //          favid: 'something',
 //          userid: 1,
 //        }
 //      }
 //      // passing 2 things with 2 keys
 //      // req.body.faveid = req.params.faveid;
 //      // req.body.userid = req.params.userid;
 //      res.locals.museum = await museumDB.destroy(req.params);
 //      next();
 //    } catch (e) {
 //      next(e);
 //    }
 //  }


  //      let fave = req.body.faveid;

  //     if (fave === 'true') {
  //       fave = !!fave;
  //     } else {
  //       fave = !fave;
  //     } .then (data => {
  //       res.locals.museum = data;
  //       theData.fave = fave;
  //       res.locals.museum = await museumDB.isItAFave(req.body);
  //       next();
  //     } catch (e) {
  //       next(e);
  //     })
  //   }
  // },


