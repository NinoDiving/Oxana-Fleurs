import { useSaveToCart } from "../../services/Context/CartContext";
import FetchDataPlants from "../../services/Product/FetchDataPlants";
import { StyledButton } from "../../style/StyledButton";
import type { ProductProps } from "../../types/Product/ProductProps";

export default function AllPlants() {
  const { plants } = FetchDataPlants();
  const { addToCart, isProductSaved } = useSaveToCart();
  const isProductInCart = (plantId: number) => isProductSaved(plantId);
  const handleAddToCart = (plant: ProductProps) => {
    addToCart(plant);
  };

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
          <StyledButton onClick={() => handleAddToCart(plante)}>
            {isProductInCart(plante.id) ? "Produit ajouté" : "Commandez"}
          </StyledButton>
        </section>
      ))}
    </article>
  );
}
