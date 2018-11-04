import { userConstants } from '../constants/user.constants';

export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { getToken };
  }
  return {};
}

const getToken = token => `Authorization ${userConstants.USER_STORAGE_KEY} ${token}`;
