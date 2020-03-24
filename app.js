const express = require('express');
const morgan = require('morgan');
// const playStore = require('playStore')
const app = express();

app.use(morgan('common'));

const appList  = require('./playstore.js');

app.get('/apps', (req, res) => {

  const { genres, sort } = req.query;

  

  res.json(appList)

});



app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});