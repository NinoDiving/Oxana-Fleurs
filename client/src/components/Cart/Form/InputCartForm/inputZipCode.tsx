import { StyledInput } from "../../../../style/StyledInput";
import type { CartFormProps } from "../../../../types/Cart/Form";

export default function InputZipCode({ handleChange, value }: CartFormProps) {
  return (
    <fieldset>
      <label htmlFor="customer_zip_code">Code postal de la livraison</label>
      <StyledInput
        required
        name="customer_zip_code"
        type="text"
        onChange={handleChange}
        value={value}
      />
    </fieldset>
  );
}
