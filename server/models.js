const db = require('../config/connection');

module.exports = function museumDB(db) {
  return {
  addUser(data) {
    return db.none(`
      INSERT INTO users
       (username, password_digest, fname, lname)
      VALUES
        ($/username/, $/password_digest/, $/fname/, $/lname/)
      `);
  },

  findOneUser(username) {
    return db.any(`
      SELECT * FROM users
      WHERE username = $1
      `, username);
  },

  getAllFaves(favesid) {
    return db.many(`
      SELECT users.username, faves.museum_id
        FROM users
        JOIN faves
          ON (users.user_id = faves.user_id)
       WHERE users.user_id = $1
      `, favesid);
  },

  getOneFave(user_id) {
    return db.any(`
      SELECT faves.museum_id
        FROM faves
       WHERE faves.user_id = $1
        `, user_id);
  },

  destroy(user_id, favesid) {
    return db.none(`
      DELETE
        FROM faves
       WHERE faves_id = $2,
         AND user_id = $1
          `, [user_id, faves_id]);
  },

  getComments(user_id) {
    return DB.many(`
      SELECT
             museum_id,
             comments,
             rating
        FROM comments
       WHERE user_id = 1$
             `,user_id);
  },

  create(data) {
    return db.one(`
      INSERT INTO comments
   museum_id = $/museum_id/,
    comments = $/comments/,
      rating = $/rating/,
     user_id = $/user_id/
       WHERE comments_id = $/comments_id/`)
  },

  updateComments(favesid) {
    return db.one(`
      UPDATE comments
         SET
   museum_id = $/museum_id/,
    comments = $/comments/,
      rating = $/rating/
       WHERE faves_id = $/faves_id/
   RETURNING *
           `, faves_id);

  },
  };
}



};
