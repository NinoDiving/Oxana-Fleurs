import { useAuth } from "../../hooks/Auth/Auth";
import useLogin from "../../hooks/Login/Login";
import Login from "../Login/Login";

export default function UserProfile() {
  const { user } = useAuth();
  const { handleLogout } = useLogin();

  return (
    <main>
      <article>
        <button onClick={handleLogout} type="button">
          Me déconnecter
        </button>
        <h1>Bienvenue {user?.lastname}</h1>
        <Login />
      </article>
    </main>
  );
}
