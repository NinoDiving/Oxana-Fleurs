import FetchDataFlowers from "../../../services/FetchDataFlowers";
import "../BackOffice.css";
import useBackOffice from "../../../hooks/backOffice/BackOffice";
import { StyledButton } from "../../../style/StyledButton";
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
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <input
                type="text"
                name="name"
                value={formFields.name}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={formFields.description}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                value={formFields.price}
                onChange={handleChange}
              />
              <button type="button" onClick={() => handleSubmit(flower.id)}>
                Enregistrer
              </button>
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
