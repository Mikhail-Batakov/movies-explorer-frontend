import { useState, useEffect } from "react";

function useWindowWidth() {
  // Инициализируем состояние с шириной окна
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Обработчик изменения размера окна
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Добавляем обработчик события resize
    window.addEventListener("resize", handleResize);

    // Вызываем обработчик сразу же, чтобы инициализировать состояние
    handleResize();

    // Удаляем обработчик события при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Пустой массив зависимостей означает, что эффект будет запущен только при монтировании компонента

  return windowWidth;
}

export default useWindowWidth;
