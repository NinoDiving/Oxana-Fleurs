import { StyledInput } from "../../../../style/StyledInput";
import type { CartFormProps } from "../../../../types/Cart/Form";

export default function InputCity({ handleChange, value }: CartFormProps) {
  return (
    <fieldset>
      <label htmlFor="customer_city">Ville de livraison</label>
      <StyledInput
        required
        type="text"
        name="customer_city"
        id="customer_city"
        onChange={handleChange}
        value={value}
      />
    </fieldset>
  );
}
