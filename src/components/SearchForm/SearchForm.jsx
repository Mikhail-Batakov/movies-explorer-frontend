import "./SearchForm.css";
import SwitchButton from "../SwitchButton/SwitchButton.jsx";
import useValidate from "../../utils/hooks/useFormValidate.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({
  isCheck,
  isSearchMouvies, //
  searchMouvies,
  isDisableCheckBox,
  handleshortMovies,
  savedMovies,
}) {
  const { formValues, errors, isFormValid, handleChange, reset } =
    useValidate();

  const { pathname } = useLocation();

  //
  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovies.length) {
      reset({ search: "" });
    } else {
      reset({ search: isSearchMouvies });
    }
  }, [isSearchMouvies, reset, pathname, savedMovies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMouvies(formValues.search);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <span className="search__img-loupe"></span>
          <input
            className="search__input"
            placeholder="Фильм"
            id="search"
            name="search"
            type="text"
            required
            value={formValues.search || ""}
            onChange={handleChange}
          />
          <button
            className="search__btn"
            type="submit"
            aria-label="Поиск"
            disabled={!isFormValid}
          ></button>
        </form>
        <span className="search__error">
          {" "}
          {errors.search ? "Введите ключевое слово" : ""}
        </span>

        <SwitchButton
          isCheck={isCheck}
          onChange={handleshortMovies}
          isDisableCheckBox={isDisableCheckBox}
          label="Короткометражки"
        />
      </div>
    </section>
  );
}

export default SearchForm;
