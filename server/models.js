const db = require('../config/connection');

module.exports = {
  addUser(data) {
    return db.none(`
      INSERT INTO users
       (username, password_digest, fname, lname)
      VALUES
        ($/username/, $/password_digest/, $/fname/, $/lname/)
      `, data);
  },

  findOneUser(username) {
    return db.any(`
      SELECT * FROM users
      WHERE username = $1
      `, username);
  },

  getAllFaves(userid) {
    return db.many(`
      SELECT
        users.user_id,
        users.username,
        users.fname,
        users.lname,
        favemuseums.*
      FROM users
      JOIN favemuseums
        ON (users.user_id = favemuseums.user_id)
      WHERE users.user_id = $1
      `, userid);
  },

  getOneFave(museum_id) {
    return db.any(`
      SELECT comments.*, favemuseums.*, users.username
        FROM comments
        JOIN favemuseums
          ON favemuseums.museum_id = comments.museum_id
        JOIN users
          ON users.user_id = favemuseums.user_id
       WHERE favemuseums.museum_id = $1
        `, museum_id);
  },

  destroyMuseum(museumid) {
    return db.none(`
      DELETE
        FROM favemuseums
       WHERE museum_id = $1,
          `, favesid);
  },

  destroyComments(commentsid) {
    return db.one(`
      DELETE FROM comments
      WHERE comments_id = $1
      RETURNING comments_id
      `, commentsid)
  },

  getComments(user_id) {
    return db.many(`
      SELECT
             museum_id,
             comments,
             rating
        FROM comments
       WHERE user_id = $1
             `, user_id);
  },

  createComment(data) {
    return db.one(`
      INSERT INTO comments
        (museum_id, comments, rating, user_id, isfave)
      VALUES
        ($/museum_id/, $/comments/, $/rating/, $/user_id/, $/isfave/)
      RETURNING *
    `, data);
  },

    // updateComments(data) {
    //   return db.one(`
    //     UPDATE comments
    //        SET
    //  museum_id = $/museum_id/,
    //   comments = $/comments/,
    //     rating = $/rating/
    //      WHERE faves_id = $/faves_id/
    //  RETURNING *
    //          `, data);
    // },
  // adding comments to museum
  // adds to faves table
  // passing 1 thing, data

// this says updateComments
// but my controller function has updateComment
// passing 1 thing, data
  updateComments(museumid, data) {
    return db.one(`
      UPDATE comments
         SET
   museum_id = $1,
  museum_location = $/museum_location/,
    comments = $/comments/,
      rating = $/rating/
     user_id = $/user_id/,
      isfave = $/isfave/

     WHERE faves_id = $/faves_id/
   RETURNING *
           `, museumid, data);

  }

}



