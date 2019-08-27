import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    const getRoutes = routes.map((route, index) => {
      return <Route key={index} path={route.path} exact={route.exact} component={route.component} />
    })
    return (
      <div>
        <Switch>
          {getRoutes}
        </Switch>
      </div>
    );
  }
}

export default App;