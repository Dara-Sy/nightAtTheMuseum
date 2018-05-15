require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  makeToken(payload) {
    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        process.env.SERVER_SECRET,
        {
        expiresIn: '1h',
          issuer:    'Group DALP',
        },
        (err, data) => err ? reject(err) : resolve(data),
      ),
    );
  },

  verify(req, res) {
    res.json(jwt.verify(req.body.token,
      process.env.SERVER_SECRET
    ))
  },

  receiveToken(req, res, next) {
    if (req.headers.authorization) {
      req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
    }
    next();
  },

  decode(token) {
    return jwt.decode(token);
  },
};
