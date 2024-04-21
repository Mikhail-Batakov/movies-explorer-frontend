import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader.jsx";
import useMoviesDisplaySettings from "../../utils/hooks/useMoviesDisplaySettings.js";
import "./MoviesCardList.css";

function MoviesCardList({
  isDisable, //
  isLoading, //
  serverError, //
  savedMovies, //
  movies, //
  saveMovie,
  onDelete,
}) {
  const { displayedMovies, handleShowMore } = useMoviesDisplaySettings(movies);
  const location = useLocation();

  return (
    <section className="cards">
      <ul className="cards__list">
        {isLoading ? (
          <Preloader />
        ) : location.pathname === "/movies" && displayedMovies.length !== 0 ? (
          displayedMovies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              savedMovies={savedMovies}
              saveMovie={saveMovie}
            />
          ))
        ) : movies.length !== 0 ? (
          movies.map((movie) => (
            <MoviesCard
              key={movie._id}
              movie={movie}
              onDelete={onDelete}
              savedMovies={savedMovies}
            />
          ))
        ) : serverError ? (
          <span className="cards__list-error">
            «Во время запроса произошла ошибка. Возможно проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте еще раз»
          </span>
        ) : !isDisable ? (
          <span className="cards__list-error">«Ничего не нашлось»</span>
        ) : location.pathname === "/movies" ? (
          <span className="cards__list-error">
            «Чтобы получить список фильмов выполните поиск»
          </span>
        ) : (
          <span className="cards__list-error">
            «Список сохраненных фильмов пуст»
          </span>
        )}
      </ul>

      {location.pathname === "/movies" &&
        displayedMovies.length < movies.length && (
          <button
            className="cards__more-btn"
            type="button"
            aria-label="Показать еще"
            onClick={handleShowMore}
          >
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
