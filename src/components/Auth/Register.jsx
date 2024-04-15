import AuthForm from "./AuthForm/AuthForm.jsx";

function Register({ onRegister }) {
  return (
    <AuthForm
      type="signup"
      onSubmit={onRegister}
      title="Добро пожаловать!"
      btnName="Зарегистрироваться"
      actionText="Уже зарегистрированы?"
      linkName="Войти"
      routeTo="/signin"
    />
  );
}

export default Register;
