import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
  },
});

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
