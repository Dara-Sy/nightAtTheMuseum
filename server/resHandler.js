module.exports = {

  handleUserLogin(req, res, next) {
    res.redirect('/' + res.locals.user.user_id + '/faves');
  },

  tester(req, res, next) {
    console.log('we got this far')
    res.send('hello')
  },

  sendJSON(req,res) {
    //show one or all
    res.json(res.locals.museums || res.locals.museums);
  },

  handleDel(req,res) {
    res.status(204).end();
  },

  throwError(err,req,res,next) {
    console.log(err);
    res.status(404).send(`nothing to see here`);
  },
};

