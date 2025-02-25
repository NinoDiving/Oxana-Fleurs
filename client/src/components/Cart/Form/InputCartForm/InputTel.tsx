import { StyledInput } from "../../../../style/StyledInput";
import type { CartFormProps } from "../../../../types/Cart/Form";

export default function InputTel({ handleChange, value }: CartFormProps) {
  return (
    <fieldset>
      <label htmlFor="customer_phone">Votre numéro de téléphone</label>
      <StyledInput
        required
        type="tel"
        name="customer_phone"
        value={value}
        onChange={handleChange}
      />
    </fieldset>
  );
}
