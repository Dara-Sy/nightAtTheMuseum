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

<<<<<<< HEAD
    findOneUser(username) {
      return db.any(`
        SELECT * FROM users
        WHERE username = $1
        `, username);
    },

    getAllFaves(userid) {
      return db.many(`
        SELECT
          users.usser_id,
          users.username,
          faves.faves_id,
          faves.museum_id
        FROM users
        JOIN faves
          ON (users.user_id = faves.user_id)
        WHERE users.user_id = $1
        `, userid);
    },

    getOneFave(museum_id) {
      return db.any(`
        SELECT *
          FROM comments
         WHERE comments.museum_id = $1
          `, museum_id);
    },

    destroy(user_id, favesid) {
      return db.none(`
        DELETE
          FROM faves
         WHERE faves_id = $2,
            `, favesid);
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

    createComment(data) {
      return db.one(`
        INSERT INTO comments
          (museum_id, comments, rating, user_id, isfave)
        VALUES
          ($/museum_id/, $/comments/, $/rating/, $/user_id/, $/isfave/)
      `);
    },

    updateComments(data) {
      return db.one(`
        UPDATE comments
           SET
     museum_id = $/museum_id/,
      comments = $/comments/,
        rating = $/rating/
         WHERE faves_id = $/faves_id/
     RETURNING *
             `, data);
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
>>>>>>> eae9b59c82318537b09732f33c7768f50b5bc64d

  };
}



