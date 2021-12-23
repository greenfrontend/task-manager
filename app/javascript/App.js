import React from 'react';

import store from 'store';
import { Provider } from 'react-redux';
import TaskBoard from 'containers/TaskBoard';

const App = () => (
  <Provider store={store}>
    <TaskBoard />
  </Provider>
);

export default App;
