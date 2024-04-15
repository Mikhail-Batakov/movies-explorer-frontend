import "./Footer.css";

import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation(); // Использование хука для получения текущего маршрута
  const endpoints = ["/movies", "/saved-movies", "/"];

  // Проверка, содержится ли текущий путь в списке разрешенных endpoints
  if (!endpoints.includes(location.pathname)) {
    return null; // Если не содержится, не рендерим Footer
  }

  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>

      <div className="footer__container">
        <ul className="footer__links">
          <li>
            <a
              className="footer__link"
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>

          <li>
            <a
              className="footer__link"
              href="https://github.com/Mikhail-Batakov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
        <p className="footer__copyright">&#169; 2024</p>
      </div>
    </footer>
  );
}

export default Footer;
