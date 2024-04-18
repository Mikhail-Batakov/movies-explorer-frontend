class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Проверяет ответ от сервера на предмет успешности запроса.
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Выполняет сетевой запрос с использованием fetch и проверяет ответ с помощью _checkResponse.
  // Возвращает результат запроса в виде промиса
  _request(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          // Вывод в консоль статуса ошибки и текста ответа для диагностики
          console.error(`HTTP error: ${response.status}`, response.statusText);
          return response.json().then((body) => {
            throw new Error(`Server error: ${body.message}`);
          });
        }
        return response.json();
      })
      .catch((error) => {
        // Обработка ошибок сети или других ошибок запроса
        console.error("Network or other error", error);
        throw error;
      });
  }

  // Метод регистрации пользователя //
  register({ name, email, password }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  // Метод авторизации пользователя //
  authorize({ email, password }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  //Метод запроса информации о пользователе //
  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Метод отправки информации о пользователе
  sendUserInfo(name, email, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  // Метод запроса фильмов //
  getMovies(token) {
    return this._request(`${this._baseUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Метод добавления фильма //
  addMovie(data, token) {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country || "Страна не указана",
        director: data.director || "Режиссер не указан",
        duration: data.duration || "Длительность не указана",
        description: data.description || "Описание не указано",
        year: data.year || "Год не указан",
        image: data.image
          ? `https://api.nomoreparties.co${data.image.url}`
          : "Ссылка на изображение не указана",
        trailerLink: data.trailerLink || "Трейлер отсутствует",
        thumbnail:
          data.image && data.image.formats && data.image.formats.thumbnail
            ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
            : "Ссылка на миниатюру не указана",
        movieId: data.id || "Идентификатор фильма не указан",
        nameRU: data.nameRU || "Название на русском языке не указано",
        nameEN: data.nameEN || "Название на английском языке не указано",
        owner: data.owner || "Владелец не указан",
      }),
    });
  }

  // Метод удаления фильма //
  deleteMovie(movieId, token) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

// Создание экземпляра класса
const mainApi = new MainApi({
  baseUrl: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default mainApi;
