import { StyledButton } from "../../style/StyledButton";
import InputEmail from "./inputForm/InputEmail";
import InputLastname from "./inputForm/InputLastname";
import InputPassword from "./inputForm/InputPassword";
import "./SignUp.css";
export default function SignUp() {
  return (
    <form action="post" className="sign-up-container">
      <InputLastname />
      <InputEmail />
      <InputPassword />
      <StyledButton type="submit">Création de mon compte</StyledButton>
    </form>
  );
}
