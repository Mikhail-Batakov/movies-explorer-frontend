import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useState, useEffect } from "react";
import useWindowWidth from "../../utils/useWindowSize.jsx";

function MoviesCardList({ arr }) {
  const width = useWindowWidth(); // Получаем текущую ширину окна
  const [displayedCount, setDisplayedCount] = useState(0);

  // Настройки для различных разрешений экрана
  const settings = {
    1280: { initial: 12, increment: 4 },
    768: { initial: 8, increment: 2 },
    320: { initial: 5, increment: 2 },
  };

  // Определение начального количества и инкремента в зависимости от ширины экрана
  const { initial, increment } =
    width >= 1280
      ? settings["1280"]
      : width >= 768
      ? settings["768"]
      : settings["320"];

  useEffect(() => {
    // Устанавливаем начальное количество карточек при монтировании компонента или изменении ширины
    setDisplayedCount(initial);
  }, [width, initial]); // Отслеживаем изменение ширины окна и начального количества

  // Функция для добавления карточек при нажатии на кнопку "Ещё"
  const handleShowMore = () => {
    setDisplayedCount((prevCount) =>
      Math.min(prevCount + increment, arr.length)
    );
  };

  return (
    <section className="cards">
      <ul className="cards__list">
        {arr.slice(0, displayedCount).map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </ul>
      {displayedCount < arr.length && (
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
