import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
require('./bootstrap-social.css');
require('./main.css');

ReactDOM.render(routes, document.getElementById('app'))