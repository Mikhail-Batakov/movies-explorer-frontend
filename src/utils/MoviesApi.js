// const moviesUrl = "https://auth.nomoreparties.co";

// const checkRes = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
// };

// const useFetch = () => {
//   const request = (url, options) => {
//     return fetch(url, options).then(checkRes);
//   };

//   getAllMovies() {
//     return request(`${moviesUrl}/beatfilm-movies`, {
//       method: 'GET',
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//   }
// }

//   return { getAllMovies };

// export default useFetch;
