import type { CartFormProps } from "../../../../types/Cart/Form";

export default function DeliveryOrCollect({
  value,
  handleChange,
}: CartFormProps) {
  return (
    <div className="radio-container">
      <input
        type="radio"
        name="isClickandCollect"
        value={value ? "1" : "0"}
        onChange={handleChange}
      />
      <label htmlFor="isClickandCollect">Livraison</label>
      <input
        type="radio"
        name="isClickandCollect"
        value={value ? "0" : "1"}
        onChange={handleChange}
      />
      <label htmlFor="isClickandCollect">Retrait en magasin</label>
    </div>
  );
}
