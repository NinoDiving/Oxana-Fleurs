import { StyledInput } from "../../../style/StyledInput";
import type { FormDataProps } from "../../../types/signup/FormData";

export default function InputEmail({
  handleChangeFormData,
  value,
}: FormDataProps) {
  return (
    <fieldset>
      {" "}
      <label htmlFor="email">Votre adresse e-mail</label>
      <StyledInput
        name="email"
        onChange={handleChangeFormData}
        id="email"
        value={value}
        type="text"
        placeholder="Votre adresse e-mail"
      />
    </fieldset>
  );
}
