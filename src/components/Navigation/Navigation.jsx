import "./Navigation.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import logoProfile from "../../images/logo-profile.svg";
import useWindowWidth from "../../utils/useWindowSize.jsx";

function Navigation({ ...props }) {
  const [ismenuOpen, setIsmenuOpen] = useState(false);
  const location = useLocation();
  const windowWidth = useWindowWidth();
  const isHomePage = location.pathname === "/";

  const logoColorChangeDesktop = `nav-menu__link-profile-icon ${
    isHomePage ? "nav-menu__link-profile-icon_color-green" : ""
  }`;
  const logoTextColorChangeDesktop = `nav-menu__link-profile ${
    !isHomePage ? "nav-menu__link-profile_color-black" : ""
  }`;

  const linkTextColorChangeDesktop = `nav-menu__link-desktop ${
    !isHomePage ? "nav-menu__link-desktop_color-black" : ""
  }`;

  // Обработчики
  const handlemenuToggle = () => {
    setIsmenuOpen((prevImenuOpen) => !prevImenuOpen);
  };

  // Разметка JSX
  return windowWidth < 1280 ? (
    <nav className={`nav-menu ${ismenuOpen ? "nav-menu_open" : ""}`}>
      <button
        className={`nav-menu__btn ${
          ismenuOpen ? "nav-menu__btn_type_close" : "nav-menu__btn_type_burger"
        }`}
        onClick={handlemenuToggle}
        type="button"
        aria-label="Переключить меню"
      ></button>

      <ul className={`nav-menu__box ${ismenuOpen ? "nav-menu__box_open" : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-menu__link nav-menu__link_active"
                : "nav-menu__link"
            }
            onClick={handlemenuToggle}
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "nav-menu__link nav-menu__link_active"
                : "nav-menu__link"
            }
            onClick={handlemenuToggle}
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              isActive
                ? "nav-menu__link nav-menu__link_active"
                : "nav-menu__link"
            }
            onClick={handlemenuToggle}
          >
            Сохраненные фильмы
          </NavLink>
        </li>
        <li>
          <Link
            to="/profile"
            className="nav-menu__link-profile"
            onClick={handlemenuToggle}
          >
            <img
              className="nav-menu__link-profile-icon"
              src={logoProfile}
              alt="Лого профиль"
            />
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="nav-menu-desktop">
      <ul className="nav-menu__box-desktop">
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `${linkTextColorChangeDesktop} ${
                isActive ? "nav-menu__link-desktop_active" : ""
              }`
            }
            onClick={handlemenuToggle}
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `${linkTextColorChangeDesktop} ${
                isActive ? "nav-menu__link-desktop_active" : ""
              }`
            }
            onClick={handlemenuToggle}
          >
            Сохраненные фильмы
          </NavLink>
        </li>
        <li>
          <Link
            to="/profile"
            className={logoTextColorChangeDesktop}
            onClick={handlemenuToggle}
          >
            <img
              className={logoColorChangeDesktop}
              src={logoProfile}
              alt="Лого профиль"
            />
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
