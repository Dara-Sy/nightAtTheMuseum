require('dotenv').config();
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
      // req.body.favesid = req.params.favesid;
      // Where are you getting faves id from?
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
      res.locals.museum = await museumDB.getOneFave(req.params);
      next();
    } catch (e) {
      console.log(e);
    }
  },


  // POST with route '/museum/:museumid'
  // adding a comment to museum
  // adds to faves table
  async createComment(req, res, next) {
    // hits db to add comment to museum (faves table)
    try {
      console.log('thisisreq.body',req.body)
      let theData = {
        museum_id: req.params.museumid,
        comments: req.body.theData.comments,
        rating: req.body.theData.rating,
        user_id: parseInt(req.body.theData.user_id)
      }
      console.log('this is thedata', theData)
      res.locals.museum = await museumDB.createComment(theData);
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
      console.log('this isreq.body', req.body)
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
      let theData = {
        userid: parseInt(req.params.userid),
        museumid: req.body.museum_id
      }
      res.locals.museum = await museumDB.destroyMuseum(theData);
      next();
    } catch (e) {
      next(e);
    }
  },

  async addMuseum(req, res, next) {
    try {
      let theData = {
        museum_id: req.body.id,
        name: req.body.name,
        address: req.body.formatted_address,
        user_id: parseInt(req.params.userid)
      }
      res.locals.museum = await museumDB.addOneMuseum(theData);
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

  },

  getAPIKey(req, res, next) {
    res.locals.apikey = process.env.API_KEY2;
    next();
  },

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



