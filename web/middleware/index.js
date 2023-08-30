require('dotenv').config(); // enables loading .env vars
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


// Allow requests from client-side
// app.use(cors({ origin: process.env.CLIENT_URL }));

// For heroku deployment
  app.use(express.static('build'));
  app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
  });

const listener = app.listen(process.env.PORT || 9090, () =>
  console.log('Listening on port ' + listener.address().port)
);
  