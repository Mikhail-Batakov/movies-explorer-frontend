import { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, onDelete, saveMovie, savedMovies }) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (pathname === "/movies")
      setIsActive(savedMovies.some((item) => movie.id === item.movieId));
  }, [savedMovies, movie.id, setIsActive, pathname]);

  function handleDeleteCard() {
    onDelete(movie._id);
    console.log("удалить");
  }

  const handleSaveCard = () => {
    if (savedMovies.some((item) => movie.id === item.movieId)) {
      setIsActive(true);
      saveMovie(movie);
    } else {
      setIsActive(false);
      saveMovie(movie);
    }
  };

  //функция для перевода минут в часы
  function formatDuration(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className="card">
      <div className="card__content">
        <div className="card__description">
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__duration">{formatDuration(movie.duration)}</p>
        </div>
        {pathname === "/movies" ? (
          <button
            type="button"
            className={`card__btn card__btn_type_save ${
              isActive && "card__btn_type_save-active"
            }`}
            aria-label="Сохранить карточку"
            onClick={handleSaveCard}
          />
        ) : (
          <button
            type="button"
            className="card__btn card__btn_type_delete"
            aria-label="Удалить карточку"
            onClick={handleDeleteCard}
          />
        )}
      </div>

      <a
        className="card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          src={
            pathname === "/saved-movies"
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt={movie.nameRU}
        ></img>
      </a>
    </li>
  );
}

export default MoviesCard;
