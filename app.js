const express = require('express');
const morgan = require('morgan');
// const playStore = require('playStore')
const app = express();

app.use(morgan('common'));

const appList  = require('./playstore.js');

app.get('/apps', (req, res) => {

  const { genres = '', sort = ''} = req.query;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be either rating or app');
    }
  }

  let updatedApps = [...appList];

  if (genres) {
    updatedApps = updatedApps
    .filter(app =>
      app
        .Genres
        .toLowerCase()
        .includes(genres.toLowerCase()));
  }

  // a["app"], a = {App: "ROBLOX"}, b = {App: "Subway Surfers"}, "ROBLOX" < "Subway Surfers" ?
  if (sort) {
    updatedApps
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(updatedApps);
  

});



app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});