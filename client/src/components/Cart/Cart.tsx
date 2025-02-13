import { useAuth } from "../../hooks/Auth/Auth";
import { useSaveToCart } from "../../services/Context/CartContext";

export default function Cart() {
  const { saveToCart } = useSaveToCart();
  const { user } = useAuth();
  return (
    <>
      <header className="header-cart">
        <h1>Merci de votre confiance {user?.firstname}</h1>
      </header>
      <main>
        {saveToCart.map((cart) => (
          <article key={cart.id}>
            <img src={`${import.meta.env.VITE_API}${cart.img_path}`} alt="" />
            <h3>{cart.name}</h3>
            <p>{cart.description}</p>
            <p>{cart.price}€</p>
          </article>
        ))}
      </main>
    </>
  );
}
