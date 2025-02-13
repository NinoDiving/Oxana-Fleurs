import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "../../assets/iconeSVG/deleteIcone";
import { useAuth } from "../../hooks/Auth/Auth";
import { useSaveToCart } from "../../services/Context/CartContext";
import { StyledButton } from "../../style/StyledButton";
import "./Cart.css";
export default function Cart() {
  const { saveToCart, removeToCart } = useSaveToCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleDeleteCart = (productId: number) => {
    removeToCart(productId);
  };
  const totalPrice = saveToCart.reduce((acc, cart) => acc + cart.price, 0);
  return (
    <>
      <header className="header-cart">
        <h1>Merci de votre confiance {user?.firstname}</h1>
        <p>Votre commande</p>
      </header>
      <main className="cart-container">
        {saveToCart.map((cart) => (
          <article key={cart.id} className="cart-product">
            <button
              className="delete-button"
              type="button"
              onClick={() => handleDeleteCart(cart.id)}
            >
              <DeleteIcon />
            </button>
            <h3>{cart.name}</h3>
            <p>{cart.price}€</p>
            <img src={`${import.meta.env.VITE_URL}${cart.img_path}`} alt="" />
          </article>
        ))}
        <h3 className="total-price">Total du panier: {totalPrice}€</h3>
        <div className="button-container">
          <StyledButton>Valider mon panier</StyledButton>
          <StyledButton onClick={() => navigate("/")}>
            Retour aux achats
          </StyledButton>
        </div>
      </main>
    </>
  );
}
