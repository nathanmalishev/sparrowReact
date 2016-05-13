const axios = require('axios');
/* _baseURL is assumed to be on same directoy as this app is served*/
const _baseURL = 'http://free.rome2rio.com/api/1.2/json/Search?key=9phTEymq&o';

export function getFlights(to,from) {
  const url = `${_baseURL}Name=${to}&dName=${from}`;
  return axios.get(`http://free.rome2rio.com/api/1.2/json/Search?key=9phTEymq&oName=${from}&dName=${to}`)
    .then((res)=> {
      if (res === undefined) {
        throw 'response is undefined';
      }

      return res;
    })
    .catch((err)=> {
      console.log(err);
      return err
    });
}
