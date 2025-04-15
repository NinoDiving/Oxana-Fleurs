import useCartForm from "../../../hooks/Form/useCartForm";
import { StyledButton } from "../../../style/StyledButton";
import InputAddress from "./InputCartForm/InputAddress";
import InputCity from "./InputCartForm/InputCity";
import InputDate from "./InputCartForm/InputDate";
import InputTel from "./InputCartForm/InputTel";
import DeliveryOrCollect from "./InputCartForm/deliveryOrCollect";
import InputZipCode from "./InputCartForm/inputZipCode";

export default function CartForm() {
  const { handleChange, handleSubmit, handleDateChange, formData } =
    useCartForm();
  return (
    <form onSubmit={handleSubmit} className="cart-form">
      <DeliveryOrCollect
        handleChange={handleChange}
        value={formData.isClickandCollect}
      />
      <InputDate
        handleDateChange={handleDateChange}
        value={formData.delivery_date}
      />
      <InputTel handleChange={handleChange} value={formData.customer_phone} />

      {formData.isClickandCollect === "1" && (
        <>
          <InputAddress
            handleChange={handleChange}
            value={formData.customer_address}
          />
          <InputCity
            handleChange={handleChange}
            value={formData.customer_city}
          />
          <InputZipCode
            handleChange={handleChange}
            value={formData.customer_zip_code}
          />
        </>
      )}

      <StyledButton type="submit">
        {formData.isClickandCollect === "1"
          ? "Validez ma livraison"
          : "Validez mon retrait"}
      </StyledButton>
    </form>
  );
}
