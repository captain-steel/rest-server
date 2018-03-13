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

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ', port ' + server_port);
});

// app.listen(3000);

// console.log('Server started successfully. http://localhost:3000/');
