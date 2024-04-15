import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PageNotFound from "./PageNotFound/PageNotFound.jsx";
import Footer from "./Footer/Footer.jsx";
// import Preloader from "./Preloader/Preloader.jsx";
import Main from "./Main/Main.jsx";
import Profile from "./Profile/Profile.jsx";
import Header from "./Header/Head.jsx";
import Movies from "./Movies/Movies.jsx";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";

import TestMoviesDB from "../utils/TestMoviesDB.js";
console.log(TestMoviesDB);

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Вывод данных в консоль при монтировании компонента
    console.log(TestMoviesDB);
  }, []); // Пустой массив зависимостей гарантирует выполнение только один раз

  const currentUser = {
    name: "Михаил",
    email: "movies@mail.ru",
  };

  function handleProfileUpdate(param) {
    const { name, email } = param;
    console.log(`Профиль бы обновлен с данными ${[name, email]}`);
  }

  function onSignOut() {
    setIsLoggedIn(false);
    navigate("/");
    console.log("Вы вышли из профиля");
  }

  function onRegister({ name, password, email }) {
    console.log(`Успешно зарегистрировались ${[name, email, password]}`);
  }

  function onLogin({ email, password }) {
    console.log(`Успешно вошли ${[email, password]}`);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="profile"
          element={
            <Profile onSubmit={handleProfileUpdate} onSignOut={onSignOut} />
          }
        />
        <Route path="movies" element={<Movies arr={TestMoviesDB} />} />
        <Route path="saved-movies" element={<Movies arr={TestMoviesDB} />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/signup" element={<Register onRegister={onRegister} />} />
        <Route path="/signin" element={<Login onLogin={onLogin} />} />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
