import { StyledInput } from "../../../style/StyledInput";

export default function InputPassword() {
  return (
    <fieldset>
      <label htmlFor="password">Votre mot de passe</label>
      <StyledInput
        name="password"
        id="password"
        type="text"
        placeholder="Votre mot de passe"
      />
      <label htmlFor="confirmed-password">Confirmez le mot de passe</label>
      <StyledInput
        name="confirmed-password"
        id="confirmed-password"
        type="text"
        placeholder="Confirmez votre mot de passe"
      />
    </fieldset>
  );
}
