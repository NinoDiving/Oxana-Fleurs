import { Link, useNavigate } from "react-router-dom";
import FetchTopPlants from "../../services/Product/FetchTopPlants";
import { StyledButton } from "../../style/StyledButton";

export default function HomePlants() {
  const { topProductPlants } = FetchTopPlants();
  const navigate = useNavigate();
  return (
    <main className="home-plants">
      <section className="home-plants-banniere">
        <h1>Découvrez aussi nos plantes</h1>
        <p>Apportez une touche de nature à votre intérieur et votre jardin !</p>
        <Link to={"/plantes"}>Découvrez nos plantes</Link>
      </section>
      <article className="container-plants">
        <h2>Nos plantes du moment</h2>
        {topProductPlants.map((plants) => (
          <section key={plants.product_id} className="cards-container">
            <img
              src={`${import.meta.env.VITE_URL}${plants.img_path}`}
              alt={plants.name}
            />
            <h3>{plants.name}</h3>
            <p>{plants.description}</p>
            <p>Prix: {plants.price}€</p>
            <StyledButton
              onClick={() => navigate(`/product/${plants.product_id}`)}
            >
              Plus d'information
            </StyledButton>
          </section>
        ))}
      </article>
    </main>
  );
}
