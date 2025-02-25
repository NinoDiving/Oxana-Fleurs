import { StyledInput } from "../../../../style/StyledInput";
import type { CartFormProps } from "../../../../types/Cart/Form";

export default function InputAddress({ handleChange, value }: CartFormProps) {
  return (
    <fieldset>
      <label htmlFor="customer_address">Votre adresse de livraison</label>
      <StyledInput
        required
        type="text"
        name="customer_address"
        onChange={handleChange}
        value={value}
      />
    </fieldset>
  );
}
