import { Link } from "react-router-dom";
import useBackOffice from "../../../hooks/backOffice/BackOffice";
import { StyledButton } from "../../../style/StyledButton";
import { StyledInput } from "../../../style/StyledInput";
import BackOfficeNav from "../BackOfficeNav";

export default function BackOfficeHome() {
  const {
    handleChange,
    handleFileChange,
    handleSubmitCreateProduct,
    formFields,
  } = useBackOffice();
  return (
    <main>
      <BackOfficeNav />
      <section className="edit-product-CTA">
        <h2>Modifiez un produit déjà existant</h2>
        <StyledButton>
          <Link to="/admin-fleurs">Modifiez les bouquets</Link>
        </StyledButton>
        <StyledButton>
          <Link to="/admin-plantes">Modifiez les plantes</Link>
        </StyledButton>
      </section>
      <section className="add-product-container">
        <h2>Ajoutez un nouveau produit</h2>
        <form
          action=""
          method="post"
          className="add-product"
          onSubmit={handleSubmitCreateProduct}
        >
          <div className="field-container">
            <label htmlFor="name">Nom du produit:</label>
            <StyledInput
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
            />
            <label htmlFor="type">Type de produits</label>
            <select
              name="type"
              id="type"
              value={formFields.type}
              onChange={handleChange}
            >
              <option value="">Choissisez un type:</option>
              <option value="plantes">Plantes</option>
              <option value="fleurs">Fleurs</option>
            </select>

            <label htmlFor="description">Description du produit:</label>

            <textarea
              name="description"
              id="description"
              value={formFields.description}
              onChange={handleChange}
            />

            <label htmlFor="price">Prix</label>
            <StyledInput
              type="number"
              name="price"
              id="price"
              value={formFields.price}
              onChange={handleChange}
            />

            <label htmlFor="img">Photo</label>
            <input
              type="file"
              accept="image/*"
              name="img"
              id="img_download"
              onChange={handleFileChange}
            />
          </div>
        </form>
        <StyledButton type="button" onClick={handleSubmitCreateProduct}>
          Validez mon choix
        </StyledButton>
      </section>
    </main>
  );
}
