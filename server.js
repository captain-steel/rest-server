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

app.configure(function() {
  app.set(
    'port',
    process.env.OPENSHIFT_NODEJS_PORT ||
      process.env.OPENSHIFT_INTERNAL_PORT ||
      process.env.PORT ||
      3000
  );
  app.set(
    'ip',
    process.env.OPENSHIFT_NODEJS_IP ||
      process.env.OPENSHIFT_INTERNAL_IP ||
      'localhost'
  );
});

app.listen(app.get('port'), app.get('ip'), function() {
  console.log(
    'Express server listening on ' + app.get('ip') + ':' + app.get('port')
  );
});

// app.listen(3000);

// console.log('Server started successfully. http://localhost:3000/');
