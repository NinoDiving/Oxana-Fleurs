import { useNavigate } from "react-router-dom";
import FetchDataPlants from "../../services/Product/FetchDataPlants";
import { StyledButton } from "../../style/StyledButton";

export default function AllPlants() {
  const { plants } = FetchDataPlants();
  const navigate = useNavigate();
  return (
    <article className="flowers-container">
      <h1>Toute nos plantes</h1>
      {plants.map((plante) => (
        <section key={plante.id} className="cards-container">
          <img
            src={`${import.meta.env.VITE_URL}${plante.img_path}`}
            alt={plante.name}
          />
          <h3>{plante.name}</h3>
          <p>{plante.description}</p>
          <p>Prix: {plante.price}€</p>
          <StyledButton onClick={() => navigate(`/product/${plante.id}`)}>
            Commandez
          </StyledButton>
        </section>
      ))}
    </article>
  );
}
