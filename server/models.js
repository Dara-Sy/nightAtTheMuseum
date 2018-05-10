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

  };
}



