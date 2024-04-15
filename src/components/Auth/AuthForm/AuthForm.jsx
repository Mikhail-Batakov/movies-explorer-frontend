import "./AuthForm.css";
import { Link } from "react-router-dom";
import LogoLink from "../../LogoLink/LogoLink.jsx";
import useValidate from "../../../utils/hooks/useFormValidate.js";

function AuthForm({
  type,
  onSubmit,
  title,
  btnName,
  actionText,
  linkName,
  routeTo,
}) {
  const {
    formValues,
    errors,
    isFormValid,

    handleChange,
  } = useValidate();

  const { name, email, password } = formValues;

  function handleSubmit(event) {
    event.preventDefault();
    const userFormData =
      type === "signup" ? { name, email, password } : { email, password };
    onSubmit(userFormData);
  }

  return (
    <section className="auth">
      <LogoLink />
      <h2 className="auth__title">{title}</h2>

      <form
        className="auth__form"
        name="auth__form"
        noValidate
        onSubmit={handleSubmit}
      >
        {type === "signup" ? (
          <label className="auth__input-label" htmlFor="name">
            Имя
            <input
              className="auth__input auth__input_type_error"
              id="name"
              name="name"
              type="text"
              placeholder="Введите имя"
              required
              minLength={2}
              maxLength={30}
              value={name || ""}
              onChange={handleChange}
            />
            <span className="auth__input-error name__error">{errors.name}</span>
          </label>
        ) : (
          ""
        )}

        <label className="auth__input-label" htmlFor="email">
          E-mail
          <input
            className="auth__input auth__input_type_error"
            id="email"
            name="email"
            type="email"
            placeholder="Введите email"
            required
            value={email || ""}
            onChange={handleChange}
          />
          <span className="auth__input-error email__error">{errors.email}</span>
        </label>

        <label className="auth__input-label" htmlFor="password">
          Пароль
          <input
            className="auth__input auth__input_type_error"
            name="password"
            type="password"
            id="password"
            minLength={3}
            maxLength={30}
            placeholder="Введите пароль"
            required
            value={password || ""}
            onChange={handleChange}
          />
          <span className="auth__input-error password__error">
            {errors.password}
          </span>
        </label>

        <>
          <span className="auth__error password__error">{errors.email}</span>
          <button
            className="auth__btn"
            type="submit"
            aria-label={type === "signup" ? "Зарегистрироваться" : "Войти"}
            disabled={!isFormValid}
          >
            {btnName}
          </button>

          <p className="auth__caption">
            {actionText}

            <Link to={routeTo} className="auth__link">
              {linkName}
            </Link>
          </p>
        </>
      </form>
    </section>
  );
}

export default AuthForm;
