const express = require('express')

const authService = require('./auth/AuthService');
const tokenService = require('./auth/TokenService');
const resHandler = require('../server/resHandler')

const app = express.Router();

app.route('/')
  .post(
    authService.doesUserExist,
    authService.generatePassword,
    authService.registerUser,
    resHandler.handleUserLogin
    )

module.exports = app;
