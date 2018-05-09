const express = require('express')

const authService = require('./AuthService');
const tokenService = require('./TokenService');
const resHandler = require('../server/resHandler')

const app = express.Router();

app.route('/register')
  .post(
    authService.doesUserExist,
    authService.generatePassword,
    authService.registerUser,
    authService.authenticate,
    resHandler.tester
  )

app.route('/login')
  .post(
    authService.authenticate,
    resHandler.handleUserLogin,
  )

module.exports = app;
