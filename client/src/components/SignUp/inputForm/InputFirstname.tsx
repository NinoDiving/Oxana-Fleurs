import { StyledInput } from "../../../style/StyledInput";

export default function InputFirstname() {
  return (
    <fieldset>
      <label htmlFor="firstname">Votre prénom</label>
      <StyledInput
        name="firstname"
        id="firstname"
        type="text"
        placeholder="Votre prénom"
      />
    </fieldset>
  );
}
