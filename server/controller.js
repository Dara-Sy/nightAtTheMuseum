module.exports = museumDB => {
  async getAllFaves(req, res, next) {
    // hit the db to get favorites list
    try {
      req.body.favesid = req.params.favesid;
      res.local.museums = await museumDB.getAllFaves(req.body.favesid);
      next();
    } catch (e) {
      next(e);
    }
  },

  // user_id, comment, rating

  async getFave(req, res, next) {
    // checks db to see if you favorited this museum
    try {
      let req = {
        params: {
          user_id: 1,
          comments: '',
          rating: 0,
        }
      res.locals.museum = await museumDB.getOne(req.params);
      next();
    } catch (e) {
      next(e);
    }
  },

  async createComment(req, res, next) {
    // hits db to add comment to museum (faves table)
    try {
      let theData = req.body;
      theData.commentid = req.session.user.commentid;
      res.locals.museum = await museumDB.create(theData.commentid);
      next();
    } catch (e) {
      next(e);
    }
  },

  async updateComment(req, res, next) {
    // hit the db to change comment
    try {
      let req = {
        params: {
          comment_id: 1,
          comments: '',
          rating: 0,
        }
      res.locals.museum = await museumDB.updateOne(req.params);
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
          user_id: 1,
          faves_id: 'favesid',
        }
      }
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
       data = await museumDB.getOneFave(req.params)
        .then (d => {
          let res.locals.museum = d;
          // show the favorites
          // res.send('Is it a Fave:' + data.favesid)
          next();
        })
          .catch (e => {
            next(e);
        })
    }
  },

});




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


