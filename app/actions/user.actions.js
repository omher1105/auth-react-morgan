import { userConstants } from '../constants/user.constants';
import { authService } from '../services/auth.service';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';

export const userActions = {
  login,
  logout,
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    authService.login(email, password).then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  authService.logout();
  return { type: userConstants.LOGOUT };
}
