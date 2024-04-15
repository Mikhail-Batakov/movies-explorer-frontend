import "./SearchForm.css";
import SwitchButton from "../SwitchButton/SwitchButton.jsx";
import useValidate from "../../utils/hooks/useFormValidate.js";

function SearchForm({ isChecked, onChange }) {
  const {
    formValues,
    errors,
    isFormValid,

    handleChange,
  } = useValidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("поиск фильмов");
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
          isChecked={isChecked}
          onChange={onChange}
          label="Короткометражки"
        />
      </div>
    </section>
  );
}

export default SearchForm;
