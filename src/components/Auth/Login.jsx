import AuthForm from "./AuthForm/AuthForm.jsx";

function Login({ onLogin }) {
  return (
    <AuthForm
      type="signin"
      onSubmit={onLogin}
      title="Рады видеть!"
      btnName="Войти"
      actionText="Ещё не зарегистрированы?"
      linkName="Регистрация"
      routeTo="/signup"
    />
  );
}

export default Login;
