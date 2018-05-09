const authRouter = require('express').Router();
const AuthSvc    = require('./AuthService');

authRouter.post('/', AuthSvc.authenticate, (req, res) => {
  res.json({ token: res.locals.token });
});

authRouter.use((err, req, res, next) => {
  res.append('WWW-Authenticate', 'JWT');
  res.status(401).json({});
});

module.exports = {
  authRouter,
  AuthService: AuthSvc,
};
