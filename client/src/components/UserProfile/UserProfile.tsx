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
        {user?.lastname ? <h1>Bienvenue {user?.firstname}</h1> : <Login />}
      </article>
    </main>
  );
}
