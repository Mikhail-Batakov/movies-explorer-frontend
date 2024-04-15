import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useValidate from "../../utils/hooks/useFormValidate.js";

function Profile({ onSubmit, onSignOut, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  const [isInputActive, setIsInputActive] = useState(false);

  const {
    formValues,
    errors,
    isFormValid,

    handleChange,

    setInitialValue,
  } = useValidate();

  useEffect(() => {
    setInitialValue(
      currentUser
        ? { name: currentUser.name, email: currentUser.email }
        : { name: "", email: "" }
    );
  }, [setInitialValue, currentUser]);

  // разблокирования полей ввода
  function handleEditClick() {
    setIsInputActive(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name: formValues.name,
      email: formValues.email,
    });

    setIsInputActive(false);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>

      <form
        className="profile__form"
        name="profile__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="profile__input-container">
          <label className="profile__input-label" htmlFor="name">
            Имя
            <input
              className="profile__input"
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={30}
              value={
                formValues.name !== undefined
                  ? formValues.name
                  : currentUser.name
              }
              placeholder="Введите имя"
              disabled={!isInputActive}
              onChange={handleChange}
            />
          </label>
          <span className="profile__input-error name__error">
            {errors.name}
          </span>
        </div>

        <div className="profile__input-container">
          <label className="profile__input-label" htmlFor="email">
            E-mail
            <input
              className="profile__input"
              id="email"
              name="email"
              type="email"
              required
              value={
                formValues.email !== undefined
                  ? formValues.email
                  : currentUser.email
              }
              placeholder="Введите e-mail"
              disabled={!isInputActive}
              onChange={handleChange}
            />
          </label>
          <span className="profile__input-error email__error">
            {errors.email}
          </span>
        </div>

        {!isInputActive ? (
          <>
            <button
              className="profile__btn profile__btn_type_edit"
              type="button"
              aria-label="Редактировать"
              onClick={handleEditClick}
            >
              Редактировать
            </button>
            <Link to="/" className="profile__logout-link" onClick={onSignOut}>
              Выйти из аккаунта
            </Link>
          </>
        ) : (
          <>
            <span className="profile__save-error">
              При авторизации произошла ошибка. Токен не передан или передан не
              в том формате.
            </span>
            <button
              className="profile__btn profile__btn_type_save"
              type="submit"
              aria-label="Сохранить"
              disabled={!isFormValid}
            >
              Сохранить
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;

// return (
//   <main className={"profile"} id={"profile"}>
//     <h1 className={"profile__title"}>{`Привет, ${currentUser.name}!`}</h1>
//     <form
//       className={"profile__form"}
//       id={"profile-form"}
//       name={"profile-edit"}
//       autoComplete={"off"}
//       noValidate
//       // onSubmit={handleSubmit}
//     >
//       <label className={"profile__input-label"}>
//         Имя
//         <input
//           className={"profile__input"}
//           id={"username"}
//           name={"username"}
//           type={"text"}
//           required
//           minLength={2}
//           maxLength={30}
//           value={formValues.username || currentUser.name}
//           placeholder={"Как вас зовут?"}
//           onChange={handleChange}
//         />
//       </label>
//       <label className={"profile__input-label"}>
//         E-mail
//         <input
//           className={"profile__input"}
//           id={"email"}
//           name={"email"}
//           type={"email"}
//           required
//           value={formValues.email || currentUser.email}
//           placeholder={"Ваш e-mail"}
//           onChange={handleChange}
//         />
//       </label>
//     </form>

//     <div className={"profile__buttons"}>
//       <button
//         className={"profile__button profile__button_type_submit-button"}
//         type={"submit"}
//         disabled={!isInputValid}
//         onClick={handleSubmit}
//       >
//         Редактировать
//       </button>
//       <button
//         className={"profile__button profile__button_type_logout-button"}
//         type={"button"}
//         onClick={onLogOut}
//       >
//         Выйти из аккаунта
//       </button>
//     </div>

//   </main>
// );
