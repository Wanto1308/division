import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppContextProvider from './contexts';
import pages from './pages';
import { getToken } from './utils/storage';
console.log(getToken())

export const MainPages = () => (
    <Switch>
      <Route component={pages.Home} exact path="/" />
      <Route component={pages.AddDivision} exact path={['/add-division', '/add-division/:id']} />
    </Switch>
);

const App = ({ history, store }) => (
  <Provider store={store}>
    <Router history={history}>
      <AppContextProvider>
        <Switch>
          <Route exact path="/login" render={() => !getToken() ? <pages.Login /> : <Redirect to="/" />} />
          <Route render={() => !getToken() ? <Redirect to="/login" /> : <MainPages />} />
        </Switch>
      </AppContextProvider>
    </Router>
  </Provider>
);

export default hot(App);

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
