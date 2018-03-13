const express = require('express');
const nedb = require('nedb');
const rest = require('express-nedb-rest');
const cors = require('cors');

const app = express();

const datastore = new nedb({
  filename: 'progressive_web_app.db',
  autoload: true
});

const api = rest();
api.addDatastore('coffees', datastore);

app.use(cors());
app.use('/', api);

app.listen(3000);

console.log('Server started successfully. http://localhost:3000/');
