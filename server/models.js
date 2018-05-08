module.exports = function museumDB(db) {
  return {

    getAllFaves(favesid) {
      return db.many(`
        SELECT users.username, faves.museum_id
          FROM users
          JOIN faves
            ON (users.user_id = faves.user_id)
         WHERE users.user_id = $1
        `, favesid);
    },
    getOneFave(favesid) {
      return db.many(`
        SELECT users.username, faves.museum_id
          FROM users
          JOIN faves
            ON (users.user_id = faves.user_id)
          WHER users.user_id = $1
          `, favesid);
    },


    destroy(user_id, favesid) {
      return db.none(`
        DELETE
          FROM faves
         WHERE faves_id = $2,
           AND user_id = $1
          `, [user_id, faves_id]);
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
};
