const compression  = require('compression');
const cors         = require('cors');
const emoji        = require('node-emoji');
const express      = require('express');
const favicon      = require('serve-favicon');
const helmet       = require('helmet');
const morgan       = require('morgan');
const nedb         = require('nedb');
const responseTime = require('response-time');
const rest         = require('express-nedb-rest');

const app = express();

const coffeeDataStore = new nedb({
  filename: 'api/coffees.db',
  autoload: true
});

const restAPI = rest();
restAPI.addDatastore('coffees', coffeeDataStore);

app.use(compression());
app.use(cors());
app.use(favicon(__dirname + '/images/favicon.ico'));
app.use(helmet());
app.use(morgan('common'));
app.use(responseTime());
app.use('/', restAPI);

app.set('port', process.env.PORT || 3000);
app.set('ipaddr', 'localhost');

app.listen(app.get('port'), app.get('ipaddr'), function() {
  // https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
  console.log(
    emoji.get('hourglass'),
    emoji.get('zap'),
    emoji.get('cat'),
    'The server is running @ ' + app.get('ipaddr') + ':' + app.get('port')
  );
});
