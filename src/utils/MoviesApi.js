class MoviesApi {
  constructor(options) {
    this._movieUrl = options.movieUrl;
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

  getAllMovies() {
    return this._request(`${this._movieUrl}/beatfilm-movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}

const moviesApi = new MoviesApi({
  movieUrl: "https://api.nomoreparties.co",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default moviesApi;
