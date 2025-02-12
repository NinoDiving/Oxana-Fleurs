import { useNavigate } from "react-router-dom";
import FetchDataFlowers from "../../services/FetchDataFlowers";
import { StyledButton } from "../../style/StyledButton";

export default function AllBouquets() {
  const { flowers } = FetchDataFlowers();
  const navigate = useNavigate();
  return (
    <article className="flowers-container">
      <h1>Tous nos bouquets</h1>
      {flowers.map((flower) => (
        <section key={flower.id} className="cards-container">
          <img
            src={`${import.meta.env.VITE_URL}${flower.img_path}`}
            alt={flower.name}
          />
          <h3>{flower.name}</h3>
          <p>{flower.description}</p>
          <p>Prix: {flower.price}€</p>
          <StyledButton onClick={() => navigate(`/product/${flower.id}`)}>
            Commandez
          </StyledButton>
        </section>
      ))}
    </article>
  );
}
