import { StyledInput } from "../../../style/StyledInput";

export default function InputEmail() {
  return (
    <fieldset>
      {" "}
      <label htmlFor="email">Votre adresse e-mail</label>
      <StyledInput
        name="email"
        id="email"
        type="text"
        placeholder="Votre adresse e-mail"
      />
    </fieldset>
  );
}
