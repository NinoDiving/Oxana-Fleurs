import { StyledDatePicker } from "../../../../style/StyledDate";

type CartFormDateProps = {
  handleDateChange: (date: Date | null, name: string) => void;
  value: string;
};

export default function InputDate({
  handleDateChange,
  value,
}: CartFormDateProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <fieldset>
      <label htmlFor="delivery_date">Date de livraison</label>
      <StyledDatePicker
        name="delivery_date"
        required
        id="delivery-date"
        showIcon
        onChange={(date) => handleDateChange(date, "delivery_date")}
        selected={value ? new Date(value) : null}
        value={value}
        minDate={tomorrow}
      />
    </fieldset>
  );
}
