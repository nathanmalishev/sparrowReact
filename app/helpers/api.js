const axios = require('axios');
const auth = require('./auth');
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.AUTH_TOKEN;
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


export function createGroup(name) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = _baseURL + 'api/groups?access_token=' + token;
  return axios.post(url, {
    name
  })
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


export function postChat(groupId, chat) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/chat?access_token=${token}`;
  return axios.post(url, chat)
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




export function postExpenses(groupId,expenses) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/expenses?access_token=${token}`;
  return axios.post(url, {
    expenses
  })
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

export function getExpenses(groupId) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/expenses?access_token=${token}`;
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


export function putExpenses(groupId,expenses) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/expenses?access_token=${token}`;
  return axios.put(url, {
    expenses
  })
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


export function deleteExpense(groupId,expense) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/expenses?access_token=${token}`;
  return axios.patch(url, {
    expense
  })
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

export function postRoute(groupId, route) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/route?access_token=${token}`;
  return axios.post(url, {
    route
  })
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

export function getUsernames(){
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/users?access_token=${token}`;
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


export function postUser(groupId,user) {
  const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/settings?access_token=${token}`;
  return axios.post(url, {
    user
  })
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

export function deleteUser(groupId){
    const token = window.localStorage.getItem('sparrow-travel-token');
  const url = `${_baseURL}api/groups/${groupId}/settings?access_token=${token}`;
  return axios.delete(url)
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

