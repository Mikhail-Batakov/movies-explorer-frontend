import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { unstable_batchedUpdates as batch } from "react-dom";

import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useValidate from "../../utils/hooks/useFormValidate.js";

function Profile({
  onSubmit,
  onSignOut,
  isError,
  isSending,
  isSuccess,
  setIsSuccess,
  isFormActive,
  setIsFormActive,
  setIsError,
}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    formValues,
    errors,
    isFormValid,
    handleChange,
    setInitialValue,
    resetFormNew,
  } = useValidate();

  // получаем текущие значения
  useEffect(() => {
    if (currentUser) {
      setInitialValue("name", currentUser.name);
      setInitialValue("email", currentUser.email);
    }
  }, [currentUser, setInitialValue, isFormActive]);

  function inputChange(e) {
    setIsError(false);
    setIsSuccess(false);
    handleChange(e);
  }

  // useEffect(() => {
  //   if (currentUser) {
  //     setInitialValue({
  //       name: currentUser.name,
  //       email: currentUser.email,
  //     });
  //   }
  // }, [setInitialValue, currentUser]);

  // useEffect(() => {
  //   resetFormNew({ name: currentUser.name, email: currentUser.email });
  // }, [resetFormNew, currentUser, isFormActive]);

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(formValues.name, formValues.email);

    // resetFormNew();
  }

  // разблокирования полей ввода
  function handleEditClick() {
    // setIsFormActive(true);
    // setIsSuccess(false);

    setIsFormActive(true);
    console.log("клик");
    // setIsSuccess(false);
    // isError && setIsError(false);
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
              value={formValues.name || ""}
              placeholder="Введите имя"
              disabled={!isFormActive}
              onChange={inputChange}
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
              value={formValues.email || ""}
              placeholder="Введите e-mail"
              disabled={!isFormActive}
              onChange={inputChange}
            />
          </label>
          <span className="profile__input-error email__error">
            {errors.email}
          </span>
        </div>
        {/* <span className="profile__save-message profile__save-error_visible">
              При обнавлении данных произошла ошибка
            </span> */}
        <span
          className={`profile__save-message ${
            isError && "profile__save-message_type_error"
          }
               ${isSuccess && "profile__save-message_type_succes"}
            }`}
        >
          {isError
            ? "При обновлении данных произошла ошибка"
            : "Данные успешно обнавлены"}
        </span>

        {!isFormActive ? (
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
            <button
              className="profile__btn profile__btn_type_save"
              type="submit"
              aria-label="Сохранить"
              disabled={!isFormValid || isError}
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
