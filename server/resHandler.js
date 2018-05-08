module.exports = {
  handleUserLogin(req, res, next) {
    res.redirect('/' + res.locals.user.user_id + '/faves');
  }
}
