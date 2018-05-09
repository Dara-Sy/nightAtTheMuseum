const jwt = require('jsonwebtoken');

module.exports = {
  makeToken(payload) {
    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        process.env.SERVER_SECRET,
        {
        expiresIn: '1h',
          issuer:    'dresselhaus',
        },
        (err, data) => err ? reject(err) : resolve(data),
      ),
    );
  },

  verify(token) {
    return new Promise((resolve, reject) =>
      jwt.verify(token,
        process.env.SERVER_SECRET,
        (err, data) => err ? reject(err) : resolve(data),
      ),
    );
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
