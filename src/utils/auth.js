import Cookies from 'js-cookie';

const USER_TOKEN = 'USER_TOKEN';

export function getToken() {
  return Cookies.get(USER_TOKEN);
}

export function setToken(token) {
  return Cookies.set(USER_TOKEN, token);
}

export function removeToken() {
  return Cookies.remove(USER_TOKEN);
}
