var morgan = require('morgan');
var bodyParser = require('body-parser');

/* TODO: white list cors and find out about method override*/
var cors = require('cors');
var override = require('method-override');
// setup global middleware here

module.exports = function (app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};
