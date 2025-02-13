import { useSaveToCart } from "../../services/Context/CartContext";
import FetchDataFlowers from "../../services/FetchDataFlowers";
import { StyledButton } from "../../style/StyledButton";
import type { ProductProps } from "../../types/Product/ProductProps";

export default function AllBouquets() {
  const { flowers } = FetchDataFlowers();
  const { isProductSaved, addToCart } = useSaveToCart();

  const isProductInCart = (flowersId: number) => isProductSaved(flowersId);

  const handleAddtoCart = (flowers: ProductProps) => {
    addToCart(flowers);
  };

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
          <StyledButton onClick={() => handleAddtoCart(flower)}>
            {isProductInCart(flower.id) ? "Produit ajouté" : "Commandez"}
          </StyledButton>
        </section>
      ))}
    </article>
  );
}
