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
    authService.isValidUser,
    authService.authenticate,
    resHandler.handleUserLogin,
  )

app.post('/token',
  tokenService.verify
  )

app.route('/login')
  .post(
    authService.isValidUser,
    authService.authenticate,
    resHandler.handleUserLogin,
  )

module.exports = app;
