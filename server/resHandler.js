module.exports = {
  handleUserLogin(req, res, next) {
    res.redirect('/' + res.locals.user.user_id + '/faves');
  },

  tester(req, res, next) {
    console.log('we got this far')
    res.send('hello')
  }
}
