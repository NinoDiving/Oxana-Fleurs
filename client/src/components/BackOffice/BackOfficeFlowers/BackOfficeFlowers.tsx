import FetchDataFlowers from "../../../services/FetchDataFlowers";
import "../BackOffice.css";
import useBackOffice from "../../../hooks/backOffice/BackOffice";
import { StyledButton } from "../../../style/StyledButton";
import { StyledInput } from "../../../style/StyledInput";
import BackOfficeNav from "../BackOfficeNav";

export default function BackOfficeFlowers() {
  const { flowers } = FetchDataFlowers();
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
      <h1>Vos bouquets</h1>
      {flowers.map((flower) => (
        <article key={flower.id} className="backOffice-products-cards">
          {editingProduct === flower.id ? (
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
                onClick={() => handleSubmit(flower.id)}
              >
                Enregistrer
              </StyledButton>
              {!handleSubmit && alert("Validez les modifications ?")}
            </>
          ) : (
            <>
              <img
                src={`${import.meta.env.VITE_URL}${flower.img_path}`}
                alt={flower.name}
              />
              <h2>
                {flower.name}{" "}
                <button type="button" onClick={() => handleEdit(flower)}>
                  🖊️
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(flower.id)}
                >
                  ❌
                </button>
              </h2>
              <p>{flower.description} </p>
              <p>{flower.price}€ </p>
              <StyledButton
                onClick={() => handleSubmitToTopProducts(flower.id)}
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
