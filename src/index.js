import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import 'patternfly/dist/css/rcue.css';
import 'patternfly/dist/css/rcue-additions.css';
import './styles/.css/index.css';

import App from './App';
import { baseName } from './routes';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router basename={baseName}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);