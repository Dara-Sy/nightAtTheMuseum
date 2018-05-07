require('dotenv').config();
const express    = require('express');
const logger     = require('morgan');
const path       = require('path');

// start express
const app = express();
const PORT = process.env.PORT || 3000;

// some logging
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

// ROUTE HANDLER
app.use('/api', (req, res) => {
  res.json({ message: 'hello from API' });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
}).on('error', console.error);

module.exports = app;
