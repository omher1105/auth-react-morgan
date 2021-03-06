import { userConstants } from '../constants/user.constants';
import { history } from '../helpers/history';

export const authService = {
  login,
  logout,
  createUserGoogle,
  searchToken,
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`http://localhost:3000/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.success) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(
          userConstants.USER_STORAGE_KEY,
          JSON.stringify(user),
        );
      }

      return user;
    });
}

function searchToken(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch('http://localhost:3000/users/search/messages', requestOptions)
    .then(handleResponse)
    .then(message => {
      console.log(message);
    })
    .catch(error => {
      console.log(error);
    });
}

function createUserGoogle(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch('http://localhost:3000/users/create', requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.success) {
        console.log('usuario creado exitosamente');
      }
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem(userConstants.USER_STORAGE_KEY);
  history.push('/login');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
