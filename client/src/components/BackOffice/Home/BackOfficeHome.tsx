import { Link } from "react-router-dom";
import useBackOffice from "../../../hooks/backOffice/BackOffice";
import { StyledButton } from "../../../style/StyledButton";
import BackOfficeNav from "../BackOfficeNav";

export default function BackOfficeHome() {
  const {
    handleChange,
    handleFileChange,
    handleSubmitCreateProduct,
    formFields,
    previewFile,
  } = useBackOffice();
  return (
    <main>
      <BackOfficeNav />
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
            <input
              type="text"
              name="name"
              id="name"
              value={formFields.name}
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
              <option value="plantes">plantes</option>
              <option value="fleurs">fleurs</option>
            </select>

            <label htmlFor="description">Description du produit:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formFields.description}
              onChange={handleChange}
            />

            <label htmlFor="price">Prix</label>
            <input
              type="text"
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
              id="img"
              onChange={handleFileChange}
            />

            {previewFile && (
              <div>
                <p>Prévisualisation :</p>
                <img
                  src={previewFile}
                  alt="Aperçu de l'image"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
        </form>
        <StyledButton type="button" onClick={handleSubmitCreateProduct}>
          Validez mon choix
        </StyledButton>
      </section>
      <section className="edit-product-CTA">
        <h2>Modifiez un produit déjà existant</h2>
        <StyledButton>
          <Link to="/admin-fleurs">Modifiez les bouquets</Link>
        </StyledButton>
        <StyledButton>
          <Link to="/admin-plantes">Modifiez les plantes</Link>
        </StyledButton>
      </section>
    </main>
  );
}
