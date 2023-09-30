class Auth {
  constructor({ url }) {
    this._url = url;
    // this._token = token;
    // this.jwt = localStorage.getItem("jwt");
  }

  _getResponseData = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  };

  register = (email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._getResponseData);
  };

  login = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._getResponseData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        } else {
          return;
        }
      });
  };

  getUserInfo = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  };
}

const auth = new Auth({
  url: "https://auth.nomoreparties.co",
});

export default auth;
