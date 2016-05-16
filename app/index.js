import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
require('./bootstrap-social.css');
require('./main.css');
require('./sparrow.css');


// Entry to our application, routes handles client side routing
ReactDOM.render(routes, document.getElementById('app'))