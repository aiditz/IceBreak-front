const ENDPOINT = 'https://ice-break.herokuapp.com';

function postData(url = '', data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
}

export default {
  async api(method, data = {}) {
    const res = await postData(`${ENDPOINT}/${method}`, data);

    if (!res.ok || res.status !== 200) {
      throw new Error('fetch fail', res);
    }

    return res.json();
  },

  async getGamestate() {
    return this.api('gamestate');
  },

  async sendAction(actionName, data) {
    return this.api('gamestate');
  },
};
