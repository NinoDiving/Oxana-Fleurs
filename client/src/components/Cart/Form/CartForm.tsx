import useCartForm from "../../../hooks/Form/useCartForm";
import { StyledButton } from "../../../style/StyledButton";
import InputAddress from "./InputCartForm/InputAddress";
import InputCity from "./InputCartForm/InputCity";
import InputDate from "./InputCartForm/InputDate";
import InputTel from "./InputCartForm/InputTel";
import InputZipCode from "./InputCartForm/inputZipCode";

export default function CartForm() {
  const { handleChange, handleSubmit, handleDateChange, formData } =
    useCartForm();
  return (
    <form onSubmit={handleSubmit}>
      <InputDate
        handleDateChange={handleDateChange}
        value={formData.delivery_date}
      />
      <InputTel handleChange={handleChange} value={formData.customer_phone} />
      <InputAddress
        handleChange={handleChange}
        value={formData.customer_address}
      />
      <InputCity handleChange={handleChange} value={formData.customer_city} />
      <InputZipCode
        handleChange={handleChange}
        value={formData.customer_zip_code}
      />

      <StyledButton type="submit">Validez ma livraison</StyledButton>
    </form>
  );
}
