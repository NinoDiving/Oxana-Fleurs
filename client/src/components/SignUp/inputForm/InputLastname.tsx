import { StyledInput } from "../../../style/StyledInput";
import type { FormDataProps } from "../../../types/signup/FormData";

export default function InputLastname({
  handleChangeFormData,
  value,
}: FormDataProps) {
  return (
    <fieldset>
      <label htmlFor="lastname">Votre nom</label>
      <StyledInput
        name="lastname"
        id="lastname"
        onChange={handleChangeFormData}
        value={value}
        type="text"
        placeholder="Votre nom"
      />
    </fieldset>
  );
}
