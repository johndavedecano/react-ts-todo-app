import * as React from 'react';
import { Route, Switch } from 'react-router';

// import * as styles from './App.css'

import TodoApp from './TodoApp';
import NotFound from './NotFound';

import { hot } from 'react-hot-loader';

const App = hot(module)(() => (
  <div>
      <Switch>
    <Route path="/" exact component={TodoApp} />
    <Route component={NotFound} />
  </Switch>
  </div>
));

export default App