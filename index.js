var app = require('./server/server')
var config = require('./server/config/config')

app.listen(config.port);
console.log('Server started on config.port: '+config.port);