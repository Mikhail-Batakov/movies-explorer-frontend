import { useState, useEffect } from "react";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let resizeTimer; // Для хранения ссылки на таймер

    function handleResize() {
      clearTimeout(resizeTimer); // Очистка предыдущего таймера перед установкой нового
      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 1000);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize); // Удаление обработчика события
      clearTimeout(resizeTimer); // Очистка таймера при размонтировании
    };
  }, []);

  return windowWidth;
}

export default useWindowWidth;
