import { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, onDelete, onSave }) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  //   //обработчик клика по кнопке сохранения
  //   function handleSaveCard() {
  //     onSave(movie);
  //   }

  //обработчик клика по кнопке удаления
  function handleDeleteCard() {
    onDelete(movie);
  }

  const handleSaveCard = () => {
    setIsActive(!isActive); // Инвертируем текущее состояние isActive
    // Другие действия при сохранении карточки
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
        {pathname === "/saved-movies" ? (
          <button
            type="button"
            className="card__btn card__btn_type_delete"
            aria-label="Удалить карточку"
            onClick={handleDeleteCard}
          />
        ) : (
          <button
            type="button"
            className={`card__btn card__btn_type_save ${
              isActive && "card__btn_type_save-active"
            }`}
            aria-label="Сохранить карточку"
            onClick={handleSaveCard}
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
          src={`https://api.nomoreparties.co${movie.image.url}`} //?
          alt={movie.nameRU}
        ></img>
      </a>
    </li>
  );
}

export default MoviesCard;
