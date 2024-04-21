import "./AuthForm.css";
import { Link } from "react-router-dom";
import LogoLink from "../../LogoLink/LogoLink.jsx";
import useValidate from "../../../utils/hooks/useFormValidate.js";
import { EMAIL_REGEX, NAME_REGEX } from "../../../utils/constants.js";
import { useEffect } from "react";

function AuthForm({
  type,
  onSubmit,
  title,
  btnName,
  actionText,
  linkName,
  routeTo,
  isError,
  setIsError,
  isSending,
}) {
  const { formValues, errors, isFormValid, handleChange } = useValidate();

  const { name, email, password } = formValues;

  function inputChange(e) {
    setIsError(false);
    handleChange(e);
  }

  useEffect(() => {
    setIsError(false);
  }, [setIsError]);

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
              pattern={NAME_REGEX}
              erorr={errors.name}
              minLength={2}
              maxLength={30}
              value={name || ""}
              onChange={inputChange}
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
            pattern={EMAIL_REGEX}
            value={email || ""}
            onChange={inputChange}
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
            onChange={inputChange}
          />
          <span className="auth__input-error password__error">
            {errors.password}
          </span>
        </label>

        <>
          <span
            className={`auth__error ${isError ? "auth__error_visible" : ""}`}
          >
            {type === "signup"
              ? "При регистрации произошла ошибка"
              : "При входе произошла ошибка"}
          </span>
          <button
            className="auth__btn"
            type="submit"
            aria-label={type === "signup" ? "Зарегистрироваться" : "Войти"}
            disabled={!isFormValid || isError || isSending}
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
