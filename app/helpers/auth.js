const axios = require('axios');
const tag = 'sparrow-travel-token';
import {config} from './config'
const _baseURL = config.url;

export function signIn(username, password) {

  return axios.post(_baseURL+'api/signin', {
    username,
    password,
  })
  .then(function (response) {
    if (response.data.token) {
      saveToken(response.data.token);
      return response.data;
    }else {
      return response.data;
    }
  })
  .catch(function (err) {
    return err;
  });

}

export function signUp(username, email, password) {

  return axios.post(_baseURL+'api/me', {
    username,
    password,
    email,
  })
  .then((response) => {
    if (response.data.token) {
      saveToken(response.data.token);
      return response;
    }else {
      return response;
    }
  })
  .catch((err) => {
    return err;
  });
}

export function forgotPassword(username, email, password) {

  return axios.put(_baseURL+'api/me', {
    username,
    password,
    email,
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    return err;
  });
}

const saveToken = (token)=> {
  window.localStorage.setItem(tag, token);
};

export function isAuth() {
  return !!window.localStorage.getItem(tag);
}

export function logout() {
  window.localStorage.removeItem(tag);
  location.reload();
  location.href = location.origin;

}

export const AUTH_TOKEN = window.localStorage.getItem(tag);
