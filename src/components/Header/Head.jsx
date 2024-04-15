import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import LogoLink from "../LogoLink/LogoLink.jsx";
import Navigation from "../Navigation/Navigation.jsx";

function Hea({ isLoggedIn }) {
  const location = useLocation();

  const headerClass = useMemo(() => {
    return `header${location.pathname === "/" ? " header_theme_blue" : ""}`;
  }, [location.pathname]);

  const endpoints = ["/movies", "/saved-movies", "/profile", "/"];

  // Проверка находится ли текущий путь в списке разрешенных endpoints
  if (!endpoints.includes(location.pathname)) {
    return null; // Если нет, заголовок не отображается
  }

  return (
    <header className={headerClass}>
      <LogoLink />
      {location.pathname === "/" && !isLoggedIn ? (
        <nav>
          <ul className="header__auth-links">
            <li>
              <Link to={"/signup"} className="header__auth-link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to={"/signin"}
                className="header__auth-link header__auth-link_type_signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <Navigation isLoggedIn={isLoggedIn} />
      )}
    </header>
  );
}

export default Hea;
