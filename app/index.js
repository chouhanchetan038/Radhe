import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
const MOUNT_NODE = document.getElementById('app');

const root = ReactDOM.createRoot(MOUNT_NODE);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />{' '}
      </Router>
    </Provider>
  </React.StrictMode>,
);
