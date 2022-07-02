import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
