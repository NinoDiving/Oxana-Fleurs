import { StyledInput } from "../../../style/StyledInput";

export default function InputLastname() {
  return (
    <fieldset>
      <label htmlFor="lastname">Votre nom</label>
      <StyledInput
        name="lastname"
        id="lastname"
        type="text"
        placeholder="Votre nom"
      />
    </fieldset>
  );
}
