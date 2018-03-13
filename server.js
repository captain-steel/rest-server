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

app.set('port', process.env.PORT || 3000);
app.set('ipaddr', 'localhost');

app.listen(app.get('port'), app.get('ipaddr'), function() {
  console.log(
    'Express server listening on ' + app.get('ipaddr') + ':' + app.get('port')
  );
});
