import AuthForm from "./AuthForm/AuthForm.jsx";

function Register({ onRegister, isError, setIsError, isSending }) {
  return (
    <AuthForm
      type="signup"
      onSubmit={onRegister}
      title="Добро пожаловать!"
      btnName="Зарегистрироваться"
      actionText="Уже зарегистрированы?"
      linkName="Войти"
      routeTo="/signin"
      isError={isError}
      setIsError={setIsError}
      isSending={isSending}
    />
  );
}

export default Register;
