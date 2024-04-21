import React, { useCallback, useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import moviesApi from "../../utils/MoviesApi.js";
import { filterMovies } from "../../utils/filterMovies";

function Movies({ saveMovie, savedMovies }) {
  const [allMovies, setAllmovies] = useState([]); // все фильмы
  const [filteredMovies, setIsFilteredMovies] = useState([]); //массив отфильтрованных фильмов
  const [isSearchMouvies, setIsSearchMouvies] = useState(""); // строка поиска фильмов
  const [isShort, setIsShort] = useState(false); // короткие фильмы / все фильмы

  const [isLoading, setIsLoading] = useState(false); //прелоадр загрузки филмов
  const [serverError, setServerError] = useState(false); // ошибка при запросе поиска фильмов

  const [isDisableCheckBox, setIsDisableCheckBox] = useState(true);

  const filter = useCallback((searchQuery, isShort, movies) => {
    localStorage.setItem("movie", JSON.stringify(searchQuery));
    localStorage.setItem("shorts", JSON.stringify(isShort));
    localStorage.setItem("allMovies", JSON.stringify(movies));
    setIsSearchMouvies(searchQuery);
    setIsFilteredMovies(filterMovies(searchQuery, isShort, movies));
  }, []);

  function searchMouvies(searchQuery) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((dataMovies) => {
          setAllmovies(dataMovies);
          setIsShort(false);
          setServerError(false);
          setIsDisableCheckBox(false);
          filter(searchQuery, isShort, dataMovies);
        })
        .catch((error) => {
          setServerError(true);
          console.error(`Ошибка при загрузке фильмов ${error}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(searchQuery, isShort, allMovies);
    }
  }

  useEffect(() => {
    if (localStorage.allMovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allMovies);
      const searchQuery = JSON.parse(localStorage.movie); //
      const isShort = JSON.parse(localStorage.shorts);
      setAllmovies(movies);
      setIsShort(isShort);
      setServerError(false);
      setIsDisableCheckBox(false);
      setIsSearchMouvies(searchQuery);
      filter(searchQuery, isShort, movies);
    }
  }, [filter]);

  function handleshortMovies() {
    if (isShort) {
      setIsShort(false);
      filter(isSearchMouvies, false, allMovies);
    } else {
      setIsShort(true);
      filter(isSearchMouvies, true, allMovies);
    }
  }

  return (
    <section className="movies">
      <SearchForm
        isSearchMouvies={isSearchMouvies}
        searchMouvies={searchMouvies}
        isCheck={isShort}
        isDisableCheckBox={isDisableCheckBox}
        handleshortMovies={handleshortMovies}
      />

      <MoviesCardList
        movies={filteredMovies}
        saveMovie={saveMovie}
        savedMovies={savedMovies}
        serverError={serverError}
        isLoading={isLoading}
        isDisable={isDisableCheckBox}
      />
    </section>
  );
}

export default Movies;
