import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function useLogin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_URL}logout`, {
        method: "POST",
        credentials: "include",
      });

      navigate("/");
    } catch (error) {
      console.error(`Erreur lors de la déconnexion ${error}`);
    }
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const data = await response.json();

      Cookies.set("token", data.token, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "lax",
      });
      setIsAuthenticated(true);
    } catch (err) {
      setError("Mot de passe ou adresse e-mail incorrect");
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return {
    email,
    password,
    handleChangePassword,
    handleChangeEmail,
    handleLogin,
    handleLogout,
    isAuthenticated,
    error,
  };
}
