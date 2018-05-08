require('dotenv').config();
const express    = require('express');
const logger     = require('morgan');
const path       = require('path');

const tokenService = require('./auth/TokenService');
const authService = require('./auth/AuthService');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(tokenService.receiveToken);

app.user('/register', authService);

app.use('/api', (req, res) => {
  res.json({ message: 'hello from API' });
});


app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
}).on('error', console.error);

module.exports = app;
