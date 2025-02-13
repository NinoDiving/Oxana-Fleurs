import { useState } from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../../style/StyledButton";
import { StyledDatePicker } from "../../style/StyledDate";
import { StyledInput } from "../../style/StyledInput";

export default function HomeHeader() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [zipCode, setZipCode] = useState<string>("");
  const onChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setZipCode(value);
    }
  };

  return (
    <article className="home-header">
      <section className="header-content">
        <h1>Trouvez le bouquet parfait</h1>
        <label htmlFor="postal-code">Votre code-postal</label>
        <StyledInput
          type="text"
          name="postal-code"
          id="postal-code"
          value={zipCode}
          onChange={onChangeZipCode}
        />
        <label htmlFor="delivery-date">Date de livraison</label>
        <StyledDatePicker
          id="delivery-date"
          showIcon
          toggleCalendarOnIconClick
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />

        <Link to="/bouquets">Trouvez un bouquet</Link>
      </section>
    </article>
  );
}
