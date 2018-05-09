const db = require('../config/connection');

module.exports = function museumDB(db) {
  return {
  addUser(data) {
    return db.none(`
      INSERT INTO users
       (username, password_digest, fname, lname)
      VALUES
        ($/username/, $/password_digest/, $/fname/, $/lname/)
      `, data);
  },

  // passing 1 thing, username
  findOneUser(username) {
    return db.any(`
      SELECT * FROM users
      WHERE username = $1
      `, username);
  },

  // passing 1 thing, userid
  getAllFaves(userid) {
    return db.many(`
      SELECT *
        FROM comments
       WHERE user_id = $1
      `, userid);
  },

  // pass 1 thing, museumid
  // route is '/museum/:museumid'
  // checks if you favorited museum

  // NOT SURE, I have googled the SELECT FROM WHERE PSQL query
  // do I reference isfave here?
  // or do I just reference where museumid and userid are in the same row?
  getOneFave(museumid) {
    return db.any(`
      SELECT museum_id
        FROM comments
       WHERE user_id = $1
        `, museumid);
  },


  // some side notes:
  // destroy(data) is passing 1 thing
  // destroy(user_id, favesid) is passing 2 things

  // passing 2 things
  destroy(user_id, favesid) {
    return db.none(`
      DELETE
        FROM comments
       WHERE isfave = $2,
         AND user_id = $1
          `, [user_id, favesid]);
  },

  getComments(user_id) {
    return DB.many(`
      SELECT
             museum_id,
             comments,
             rating
        FROM comments
       WHERE user_id = $1
             `, user_id);
  },

  // adding comments to museum
  // adds to faves table
  // passing 1 thing, data
  create(museumid, data) {
    return db.one(`
      INSERT INTO comments (
        museum_id,
        comments,
        rating,
        user_id,
        isfave)

      VALUES (
        $1,
        $/comments/,
        $/rating/,
        $/user_id/,
        $/isfave/)

      `, [museumid, data]);
  },

// this says updateComments
// but my controller function has updateComment
// passing 1 thing, data
  updateComments(data) {
    return db.one(`
      UPDATE comments
         SET
   museum_id = $1,
    comments = $/comments/,
      rating = $/rating/
     user_id = $/user_id/,
      isfave = $/isfave/

     WHERE faves_id = $/faves_id/
   RETURNING *
           `, data);

  },
  };
}



