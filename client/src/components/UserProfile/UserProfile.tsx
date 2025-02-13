import { useAuth } from "../../hooks/Auth/Auth";
import useLogin from "../../hooks/Login/Login";
import { StyledButton } from "../../style/StyledButton";
import Login from "../Login/Login";
import "./UserProfile.css";
export default function UserProfile() {
  const { user } = useAuth();
  const { handleLogout } = useLogin();

  return (
    <>
      {user?.lastname ? (
        <main className="user-profile">
          <h1>Bienvenue {user?.firstname}</h1>
          <StyledButton onClick={handleLogout} type="button">
            Me déconnecter
          </StyledButton>
        </main>
      ) : (
        <Login />
      )}
    </>
  );
}
