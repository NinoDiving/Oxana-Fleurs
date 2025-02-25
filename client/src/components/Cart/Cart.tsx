import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/Auth";
import { useSaveToCart } from "../../services/Context/CartContext";
import { StyledButton } from "../../style/StyledButton";
import "./Cart.css";
import { AddCartIcon } from "../../assets/iconeSVG/AddCartIcon";
import { DeleteCartIcone } from "../../assets/iconeSVG/DeleteCartIcon";
import type { ProductProps } from "../../types/Product/ProductProps";
import ModalFormCart from "../modal/ModalFormCart";

export default function Cart() {
  const { saveToCart, removeToCart, addToCart } = useSaveToCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteCart = (productId: number) => {
    removeToCart(productId);
  };

  const handleAddToCart = (cartItem: ProductProps) => {
    addToCart(cartItem);
  };

  const totalPrice = saveToCart.reduce(
    (acc, cart) => acc + cart.price * cart.quantity,
    0,
  );

  return (
    <>
      <header className="header-cart">
        <h1>Merci de votre confiance {user?.firstname}</h1>
        <p>Votre commande</p>
      </header>
      <main className="cart-container">
        {saveToCart.map((cart) => (
          <article key={cart.id} className="cart-product">
            <button onClick={() => handleAddToCart(cart)} type="button">
              <AddCartIcon />
            </button>
            <p>Quantité:{cart.quantity}</p>
            <h3>{cart.name}</h3>
            <p>{cart.price}€</p>
            <img src={`${import.meta.env.VITE_URL}${cart.img_path}`} alt="" />
            <button
              className="delete-button"
              type="button"
              onClick={() => handleDeleteCart(cart.id)}
            >
              <DeleteCartIcone />
            </button>
          </article>
        ))}
        <h3 className="total-price">Total du panier: {totalPrice}€</h3>
        <div className="button-container">
          <ModalFormCart />
          <StyledButton onClick={() => navigate("/")}>
            Retour aux achats
          </StyledButton>
        </div>
      </main>
    </>
  );
}
