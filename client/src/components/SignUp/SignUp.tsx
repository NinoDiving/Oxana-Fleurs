import useSignup from "../../hooks/signup/Signup";
import { StyledButton } from "../../style/StyledButton";
import InputEmail from "./inputForm/InputEmail";
import InputFirstname from "./inputForm/InputFirstname";
import InputLastname from "./inputForm/InputLastname";
import InputPassword from "./inputForm/InputPassword";
import "./SignUp.css";
import InputCG from "./inputForm/InputCG";
export default function SignUp() {
  const {
    handleSubmitUserData,
    handleChangeFormData,
    handleCheckPassword,
    handleConfirmedPassword,
    formData,
    errors = {},
    password,
    confirmedPassword,
    isSamePassword,
  } = useSignup();
  return (
    <form
      action="post"
      className="sign-up-container"
      onSubmit={handleSubmitUserData}
    >
      <InputLastname
        handleChangeFormData={handleChangeFormData}
        value={formData.lastname}
      />
      <InputFirstname
        handleChangeFormData={handleChangeFormData}
        value={formData.firstname}
      />
      <InputEmail
        handleChangeFormData={handleChangeFormData}
        value={formData.email}
      />
      <InputPassword
        errors={errors}
        isSamePassword={isSamePassword}
        password={password}
        confirmedPassword={confirmedPassword}
        handleCheckPassword={handleCheckPassword}
        handleConfirmedPassword={handleConfirmedPassword}
      />
      <InputCG />
      <StyledButton type="submit">Créer un compte</StyledButton>
    </form>
  );
}
