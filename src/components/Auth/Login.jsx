import AuthForm from "./AuthForm/AuthForm.jsx";

function Login({ onLogin, isError, setIsError, isSending }) {
  return (
    <AuthForm
      type="signin"
      onSubmit={onLogin}
      title="Рады видеть!"
      btnName="Войти"
      actionText="Ещё не зарегистрированы?"
      linkName="Регистрация"
      routeTo="/signup"
      isError={isError}
      setIsError={setIsError}
      isSending={isSending}
    />
  );
}

export default Login;
