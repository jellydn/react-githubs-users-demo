import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './App';
import User from './User';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/user/:userId" component={User} />
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('root'),
);
