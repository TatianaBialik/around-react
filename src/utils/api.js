class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {headers: this._headers})
      .then(this._checkResponse);
  }

  addCard({name,link}) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link 
      })
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return (isLiked) ? 
      fetch(this._baseUrl + '/cards/likes/' + id, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse) :
      fetch(this._baseUrl + '/cards/likes/' + id, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  editProfilePhoto(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }

  editProfileInfo({name,about}) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/cohort-3-en',
  headers: {
    authorization: "c0d07090-8c80-49c2-aa7a-cd5677a34984",
    "Content-Type": "application/json"
  }
});

export default api;