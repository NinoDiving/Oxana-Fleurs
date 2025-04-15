import useBackOffice from "../../../hooks/backOffice/BackOffice";
import FetchDataPlants from "../../../services/Product/FetchDataPlants";
import { StyledButton } from "../../../style/StyledButton";
import { StyledInput } from "../../../style/StyledInput";
import BackOfficeNav from "../BackOfficeNav";

export default function BackOfficePlantes() {
  const { plants } = FetchDataPlants();
  const {
    editingProduct,
    handleChange,
    handleEdit,
    handleFileChange,
    handleSubmit,
    handleSubmitToTopProducts,
    handleDeleteProduct,
    formFields,
  } = useBackOffice();
  return (
    <main className="backOffice-products">
      <BackOfficeNav />
      <h1>Vos plantes</h1>
      {plants.map((plante) => (
        <article key={plante.id} className="backOffice-products-cards">
          {editingProduct === plante.id ? (
            <>
              <label htmlFor="edit-img">Photo</label>
              <input
                id="edit-img"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="name">Nom du produit</label>
              <StyledInput
                id="name"
                type="text"
                name="name"
                value={formFields.name}
                onChange={handleChange}
              />
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formFields.description}
                onChange={handleChange}
              />
              <label htmlFor="price">Prix</label>
              <StyledInput
                id="price"
                type="number"
                name="price"
                value={formFields.price}
                onChange={handleChange}
              />
              <StyledButton
                type="button"
                onClick={() => handleSubmit(plante.id)}
              >
                Enregistrer
              </StyledButton>
              {!handleSubmit && alert("Validez les modifications ?")}
            </>
          ) : (
            <>
              <img
                src={`${import.meta.env.VITE_URL}${plante.img_path}`}
                alt={plante.name}
              />
              <h2>
                {plante.name}{" "}
                <button type="button" onClick={() => handleEdit(plante)}>
                  🖊️
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(plante.id)}
                >
                  ❌
                </button>
              </h2>
              <p>{plante.description} </p>
              <p>{plante.price}€ </p>
              <StyledButton
                onClick={() => handleSubmitToTopProducts(plante.id)}
              >
                Ajoutez aux produits phare
              </StyledButton>
            </>
          )}
        </article>
      ))}
    </main>
  );
}
