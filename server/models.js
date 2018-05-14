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
        comments.*,
        favemuseum.*
      FROM users
      JOIN comments
        ON (users.user_id = comments.user_id)
      JOIN favemuseum
        ON (comments.museum_id = favemuseum.museum_id)
      WHERE users.user_id = $1
      `, userid);
  },

  getOneFave(museum_id) {
    return db.any(`
      SELECT *
        FROM comments
        JOIN favemuseum
          ON favemuseum.museum_id = comments.museum_id
       WHERE comments.comments_id = $1
        `, museum_id);
  },

  destroyMuseum(museumid) {
    return db.none(`
      DELETE
        FROM favemuseum
       WHERE museum_id = $1,
          `, favesid);
  },

  destroyComments(commentsid) {
    return db.none(`
      DELETE FROM comments
      WHERE comments_id = $1
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
    `);
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
  create(museumid, data) {
    return db.one(`
      INSERT INTO comments (
        museum_id,
        museum_location,
        comments,
        rating,
        user_id,
        isfave)

      VALUES (
        $1,
        $/museum_location/,
        $/comments/,
        $/rating/,
        $/user_id/,
        $/isfave/)

      `, [museumid, data]);
  },

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



