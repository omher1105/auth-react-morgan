import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userConstants } from '../constants/user.constants';

export function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !!localStorage.getItem(userConstants.USER_STORAGE_KEY) === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>}
    />
  );
}

