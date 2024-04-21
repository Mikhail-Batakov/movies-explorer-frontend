import React, { useCallback, useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { filterMovies } from "../../utils/filterMovies";

function SavedMovies({ savedMovies, onDelete }) {
  const [filteredMovies, setIsFilteredMovies] = useState(savedMovies); //массив отфильтрованных фильмов
  const [isSearchQuery, setIsSearchQuery] = useState(""); // строка поиска фильмов
  const [isShort, setIsShort] = useState(false); // короткие фильмы / все фильмы
  const [isDisableCheckBox, setIsDisableCheckBox] = useState(true); //блокировка чекбокса

  const filter = useCallback((searchQuery, isShort, movies) => {
    setIsSearchQuery(searchQuery);
    setIsFilteredMovies(filterMovies(searchQuery, isShort, movies));
  }, []);

  function searchMouvies(searchQuery) {
    setIsDisableCheckBox(false);
    filter(searchQuery, isShort, savedMovies);
  }

  useEffect(() => {
    if (savedMovies.length === 0) {
      setIsDisableCheckBox(true);
    } else {
      setIsDisableCheckBox(false);
    }
    filter(isSearchQuery, isShort, savedMovies);
  }, [filter, savedMovies, isShort, isSearchQuery]);

  function handleshortMovies() {
    if (isShort) {
      setIsShort(false);
      setIsDisableCheckBox(false);
      filter(isSearchQuery, false, savedMovies);
    } else {
      setIsShort(true);
      setIsDisableCheckBox(false);
      filter(isSearchQuery, true, savedMovies);
    }
  }

  return (
    <section className="movies">
      <SearchForm
        handleshortMovies={handleshortMovies}
        isCheck={isShort}
        isDisableCheckBox={isDisableCheckBox}
        searchMouvies={searchMouvies}
        savedMovies={savedMovies}
        isSearchMouvies={isSearchQuery}
      />

      <MoviesCardList
        isDisable={isDisableCheckBox}
        movies={filteredMovies}
        onDelete={onDelete}
      />
    </section>
  );
}

export default SavedMovies;
