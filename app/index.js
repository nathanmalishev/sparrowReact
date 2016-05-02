import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'

require('./main.scss');
require('./bootstrap-social.css');

ReactDOM.render(routes, document.getElementById('app'))