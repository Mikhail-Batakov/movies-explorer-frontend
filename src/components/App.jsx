import React, { useCallback } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

import TestMoviesDB from "../utils/TestMoviesDB.js";
console.log(TestMoviesDB);

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({});

  const [isError, setIsError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // успешная регистрация
  const [isFormActive, setIsFormActive] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    console.log(TestMoviesDB);
  }, []);

  // function handleProfileUpdate(param) {
  //   const { name, email } = param;
  //   console.log(`Профиль бы обновлен с данными ${[name, email]}`);
  // }

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwt");
  //   if (jwtToken) {
  //     Promise.all([mainApi.getUserInfo(jwtToken), mainApi.getMovies(jwtToken)])
  //       .then(([userData, moviedData]) => {
  //         setCurrentUser(userData);
  //         setSavedMovies(moviedData.reverse());
  //         setIsLoadingPage(false);
  //       })
  //       .catch((error) => console.error(`Ошибка при загрузке данных ${error}`));
  //   }
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwt");
  //   if (jwtToken) {
  //     mainApi
  //       .getUserInfo(jwtToken)
  //       .then((data) => {
  //         setCurrentUser(data);
  //         setIsLoggedIn(true);
  //       })
  //       .catch((err) => {
  //         console.error(`Ошибка при повторном входе ${err}`);
  //       });
  //   } else {
  //     setIsLoggedIn(false);
  //     setIsLoadingPage(false);
  //   }
  // }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoggedIn(false);
      setIsLoadingPage(false);
    }
  }, []);

  // Функция обновления данных пользователя
  function handleProfileUpdate(name, email) {
    setIsSending(true);
    mainApi
      .sendUserInfo(name, email, localStorage.getItem("jwt"))
      .then((res) => {
        setCurrentUser(res);
        setIsSuccess(true);
        // setIsError(false);
        setIsFormActive(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при обновлении данных профиля ${err}`);
      })
      .finally(() => setIsSending(false));
  }

  console.log(isFormActive);

  useEffect(() => {
    setIsError(false);
    setIsSuccess(false);
    setIsFormActive(false);
  }, [navigate]);

  // const handleProfileUpdate = useCallback(
  //   (name, email) => {
  //     mainApi
  //       .sendUserInfo(name, email, localStorage.getItem("jwt"))
  //       .then((res) => {
  //         console.log(res);
  //         setCurrentUser(res);
  //         setError(false);
  //       })
  //       .catch((err) => {
  //         setError(true);
  //         console.error(`Ошибка при обновлении данных профиля ${err}`);
  //       })
  //       .finally(() => setIsSuccess(false));
  //   },
  //   [setCurrentUser, setError, setIsSuccess]
  // );

  //Функция авторизации пользователя
  function onLogin(email, password) {
    setIsSuccess(true);
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
      .finally(() => setIsSuccess(false));
  }

  //Функция регистрации пользователя
  function onRegister(name, email, password) {
    setIsSuccess(true);
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
      .finally(() => setIsSuccess(false));
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
                  arr={TestMoviesDB}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  component={SavedMovies}
                  arr={TestMoviesDB}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Login onLogin={onLogin} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Register onRegister={onRegister} />
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
