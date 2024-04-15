import React, { useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";

function SavedMovies({ arr }) {
  const [ishortMovies, setIshortMovies] = useState(false);

  function handleshortMovies(onChange) {
    setIshortMovies(onChange);
  }

  return (
    <section className="movies">
      <SearchForm onChange={handleshortMovies} isChecked={ishortMovies} />

      <MoviesCardList arr={arr} />
    </section>
  );
}

export default SavedMovies;
