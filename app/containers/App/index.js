/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import GlobalStyle from '../../global-styles';
import { Login } from '../Login';
import { history } from '../../helpers/history';
import { userConstants } from '../../constants/user.constants';
import { HomePage } from '../HomePage';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !!localStorage.getItem(userConstants.USER_STORAGE_KEY) === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>}
    />
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/" component={HomePage}/>
            <Route exact path="/login" component={Login}/>
          </div>
        </Router>
        <GlobalStyle/>
      </div>
    );
  }
};


function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
