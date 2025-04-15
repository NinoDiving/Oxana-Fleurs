import { Link } from "react-router-dom";

export default function InputCG() {
  return (
    <div className="checkbox-wrapper">
      <label htmlFor="cgu">
        Acceptez les{" "}
        <Link to="/cgu">
          <strong>Conditions générales d'utilisation</strong>
        </Link>
      </label>
      <input required type="checkbox" name="cgu" id="cgu" />
      <label htmlFor="cgv">
        Acceptez les{" "}
        <Link to="/cgv">
          <strong>Conditions générales de vente</strong>
        </Link>
      </label>
      <input required type="checkbox" name="cgv" id="cgv" />
    </div>
  );
}
