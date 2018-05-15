const bcrypt = require('bcrypt');
const model = require('../server/models');
const TokenService = require('./TokenService');



module.exports = {
  async isValidUser(req, res, next) {
    try {
      const user = await model.findOneUser(req.body.username);
      res.locals.user = user;
      res.locals.ispassgood = await bcrypt.compare(req.body.password, user[0].password_digest);
      next()
    } catch (err) {
      console.error(err);
    }
  },

  async generatePassword(req, res, next) {
    const { password } = req.body;
    await bcrypt.hash(password, 11)
      .then( (hash) => {
        res.locals.user = req.body;
        res.locals.user.password_digest = hash;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  doesUserExist(req, res, next) {
    model.findOneUser(req.body.username)
      .then(data => {
        if(data.length === 0){
          next();
        } else {
          res.send('User already exists');
        }
      })
      .catch(err => {
        next(err);
      })

  },

  registerUser(req, res, next) {
    model.addUser(res.locals.user)
      .then( (data) => {
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  authenticate(req, res, next) {
    if (res.locals.ispassgood === false) {
      return next({});
    }
    TokenService.makeToken({
      user_id: res.locals.user[0].user_id,
    })
      .then((token) => {
        res.locals.token = token;
        next();
      })
      .catch(next);
        return false;
  },

  allow({ roles }) {
    return [
      (req, res, next) => {
        TokenService.verify(req.authToken)
          .then((payload) => {
            const isAuthorized = roles.some(n => payload.roles.includes(n));
            return isAuthorized ? next() : Promise.reject('User not authorized');
          })
          .catch(next);
      },
      (err, req, res, next) => {
        console.log(err);
        res.status(403).json({});
      },
    ];
  },

  killArray(user) {
    if(Array.isArray(user)) {
      return user[0];
    } else {
      return user;
    }
  }
};
