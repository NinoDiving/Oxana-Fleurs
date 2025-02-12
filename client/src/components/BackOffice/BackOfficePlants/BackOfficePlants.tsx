import useBackOffice from "../../../hooks/backOffice/BackOffice";
import FetchDataPlants from "../../../services/Product/FetchDataPlants";
import { StyledButton } from "../../../style/StyledButton";
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
              <button type="button" onClick={() => handleSubmit(plante.id)}>
                Enregistrer
              </button>
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
