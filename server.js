const compression  = require('compression');
const cors         = require('cors');
const emoji        = require('node-emoji');
const express      = require('express');
const favicon      = require('serve-favicon');
const fs           = require('fs');
const helmet       = require('helmet');
const https        = require('https');
const morgan       = require('morgan');
const nedb         = require('nedb');
const rateLimit    = require('express-rate-limit');
const responseTime = require('response-time');
const rest         = require('express-nedb-rest');

const app = express();

const coffeeDataStore = new nedb({
  filename: 'api/coffees.db',
  autoload: true
});

const restAPI = rest();
restAPI.addDatastore('coffees', coffeeDataStore);

const options = {
  cert: fs.readFileSync('/path-to-https-keys/fullchain.pem'),
  key: fs.readFileSync('/path-to-https-keys/privkey.pem')
};

var limiter = new rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.disable('x-powered-by');

app.use(compression());
app.use(cors());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(helmet());
app.use(limiter);
app.use(morgan('common'));
app.use(responseTime());
app.use('/', restAPI);

app.set('port', process.env.PORT || 3000);
app.set('ipaddr', '0.0.0.0');

app.listen(app.get('port'), app.get('ipaddr'), function() {
  console.log(
    emoji.get('hourglass'),
    emoji.get('zap'),
    emoji.get('cat'),
    'The server is running @ ' + app.get('ipaddr') + ':' + app.get('port')
  );
});
https.createServer(options, app).listen(8443);
