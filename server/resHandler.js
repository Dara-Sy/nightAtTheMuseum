module.exports = {
sendJSON(req,res) {
  //show one or all
  res.json(res.locals.??? || res.locals.???);
},




handleDel(req,res) {
  res.status(204).end();
},

throwError(err,req,res,next) {
  console.log(err);
  res.status(404).send(`nothing to see here`);
},

};
