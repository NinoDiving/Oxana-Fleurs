import { StyledInput } from "../../../style/StyledInput";
import type { FormDataProps } from "../../../types/signup/FormData";

export default function InputFirstname({
  handleChangeFormData,
  value,
}: FormDataProps) {
  return (
    <fieldset>
      <label htmlFor="firstname">Votre prénom</label>
      <StyledInput
        name="firstname"
        id="firstname"
        onChange={handleChangeFormData}
        value={value}
        type="text"
        placeholder="Votre prénom"
      />
    </fieldset>
  );
}
