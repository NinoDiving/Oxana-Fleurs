import useLogin from "../../hooks/Login/Login";
import { StyledInput } from "../../style/StyledInput";

export default function Login() {
  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
    error,
  } = useLogin();
  return (
    <main className="login-container">
      <form action="" className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Votre adresse e-mail</label>
        <StyledInput
          onChange={handleChangeEmail}
          value={email}
          type="email"
          name="email"
          id="email-login"
          placeholder="Votre adresse e-mail"
        />
        <label htmlFor="password">Votre mot de passe</label>
        <StyledInput
          type="password"
          name="password"
          value={password}
          id="password-login"
          onChange={handleChangePassword}
        />
        {error && <p>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
}
