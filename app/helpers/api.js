const axios = require('axios');
const auth = require('./auth');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.AUTH_TOKEN;
/* _baseURL is assumed to be on same directoy as this app is served*/
const _baseURL = 'http://localhost:3000/';

export function getGroups() {
  const url = _baseURL + 'api/groups';
  const token = window.localStorage.getItem('sparrow-travel-token');
  return axios.get(url + '?access_token=' + token)
    .then((res)=> {
      if (res === undefined) {
        throw 'response is undefined';
      }

      return res;
    })
    .catch((err)=> {
      console.log(err);
    });
}

export function getGroup(id) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = _baseURL + 'api/groups/' + id + '?access_token=' + token;
  return axios.get(url)
  .then((res)=> {
    if (res === undefined) {
      throw 'response is undefined';
    }

    return res;
  })
  .catch((err)=> {
    console.log(err);
  });
}
