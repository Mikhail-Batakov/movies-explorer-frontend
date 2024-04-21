import React, { useState, useEffect } from "react";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PageNotFound from "./PageNotFound/PageNotFound.jsx";
import Footer from "./Footer/Footer.jsx";
import Preloader from "./Preloader/Preloader.jsx";
import Main from "./Main/Main.jsx";
import Profile from "./Profile/Profile.jsx";
import Header from "./Header/Head.jsx";
import Movies from "./Movies/Movies.jsx";
import SavedMovies from "./SavedMovies/SavedMovies.jsx";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import mainApi from "../utils/MainApi.js";

// if (process.env.NODE_ENV !== "production") {
//   const { whyDidYouUpdate } = require("why-did-you-update");
//   whyDidYouUpdate(React);
// }

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [currentUser, setCurrentUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [isSending, setIsSending] = useState(false); //отправка запроса
  const [isSuccess, setIsSuccess] = useState(false); // успешная обновление дааных профиля
  const [isFormActive, setIsFormActive] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const jwtToken = localStorage.getItem("jwt");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      Promise.all([mainApi.getUserInfo(jwtToken), mainApi.getMovies(jwtToken)])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData.reverse());
          setIsLoggedIn(true);
          setIsLoadingPage(false);
        })
        .catch((error) => {
          console.error(`Ошибка при загрузке данных ${error}`);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoadingPage(false);
    }
  }, [isLoggedIn]);

  // Функция обновления данных пользователя
  function handleProfileUpdate(name, email) {
    setIsSending(true);
    mainApi
      .sendUserInfo(name, email, jwtToken)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccess(true);
        setIsError(false);
        setIsFormActive(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при обновлении данных профиля ${err}`);
      })
      .finally(() => setIsSending(false));
  }

  useEffect(() => {
    setIsError(false);
    setIsSuccess(false);
    setIsFormActive(false);
  }, [navigate]);

  // Функция удаления фильма из избранного
  function handleDelMovie(movieId) {
    mainApi
      .deleteMovie(movieId, jwtToken)
      .then(() => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((item) => item._id !== movieId)
        );
      })
      .catch((err) =>
        console.error(
          `Ошибка при удалении фильма из избранного: ${err.message}`
        )
      );
  }

  // Функция добавляет / убирает фильма из избранного
  function handleSaveMovie(movie) {
    const savedMovie = savedMovies.some((item) => movie.id === item.movieId);
    if (savedMovie) {
      const foundMovie = savedMovies.find((item) => item.movieId === movie.id);
      handleDelMovie(foundMovie._id);
    } else {
      mainApi
        .addMovie(movie, jwtToken)
        .then((res) => {
          setSavedMovies((savedMovies) => [res, ...savedMovies]);
        })
        .catch((err) =>
          console.error(
            `Ошибка при сохранении или удалении фильма из избранного: ${err.message}`
          )
        );
    }
  }

  //Функция авторизации пользователя
  function onLogin(email, password) {
    setIsSending(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies");
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при авторизации пользователя ${err}`);
      })
      .finally(() => setIsSending(false));
  }

  //Функция регистрации пользователя
  function onRegister(name, email, password) {
    setIsSending(true);
    mainApi
      .register(name, email, password)
      .then(() => {
        onLogin(name, email);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при регистрации пользователя ${err}`);
      })
      .finally(() => setIsSending(false));
  }

  // функция выхода из профиля //
  function onSignOut() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
    console.log("Вы вышли из профиля");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoadingPage ? (
        <Preloader />
      ) : (
        <>
          <Header isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  component={Profile}
                  isLoggedIn={isLoggedIn}
                  onSignOut={onSignOut}
                  onSubmit={handleProfileUpdate}
                  isError={isError}
                  setIsError={setIsError}
                  isSending={isSending}
                  isSuccess={isSuccess}
                  setIsSuccess={setIsSuccess}
                  isFormActive={isFormActive}
                  setIsFormActive={setIsFormActive}
                />
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={Movies}
                  saveMovie={handleSaveMovie}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  component={SavedMovies}
                  onDelete={handleDelMovie}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                />
              }
            />

            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Login
                    onLogin={onLogin}
                    isError={isError}
                    setIsError={setIsError}
                    isSending={isSending}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Register
                    onRegister={onRegister}
                    isError={isError}
                    setIsError={setIsError}
                    isSending={isSending}
                  />
                )
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />{" "}
        </>
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;
