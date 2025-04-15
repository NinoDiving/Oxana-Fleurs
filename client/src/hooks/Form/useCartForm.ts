import { useState } from "react";
import { useSaveToCart } from "../../services/Context/CartContext";
import { useAuth } from "../Auth/Auth";

export default function useCartForm() {
  const { user } = useAuth();
  const { saveToCart, removeToCart } = useSaveToCart();
  const totalPrice = saveToCart.reduce(
    (acc, cart) => acc + cart.price * cart.quantity,
    0,
  );
  const [formData, setFormData] = useState({
    customer_phone: "",
    customer_address: "",
    customer_city: "",
    customer_zip_code: "",
    delivery_date: "",
    isClickandCollect: "1",
    total_price: totalPrice,
    items: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date: Date | null, name: string) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        [name]: date.toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const items = saveToCart.map((cartItem) => ({
      product_id: cartItem.id,
      quantity: cartItem.quantity,
      price: cartItem.price,
    }));

    const purchaseData = {
      customer_phone: formData.customer_phone,
      customer_address: formData.customer_address,
      customer_city: formData.customer_city,
      customer_zip_code: formData.customer_zip_code,
      delivery_date: formData.delivery_date,
      total_price: totalPrice,
      isClickandCollect: formData.isClickandCollect,
      user_id: user ? user.id : null,
      items: items,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
        credentials: "include",
      });
      if (!response.ok)
        throw new Error("Erreur lors de l'envoi de la commande");

      alert("Commande enregistrée avec succès !");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue");
      return; // Exit the function if there is an error
    }

    try {
      const clientUrl = import.meta.env.VITE_URL;
      const stripeResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart: saveToCart.map((item) => ({
              id: item.id,
              name: item.name,
              img_path: new URL(`/${item.img_path}`, clientUrl).href,
              price: item.price,
              quantity: item.quantity,
            })),
            email: user?.email || "",
          }),
          credentials: "include",
        },
      );

      if (!stripeResponse.ok) {
        throw new Error("Erreur lors de l'envoi des produits du panier");
      }

      const { paymentUrl } = await stripeResponse.json();
      window.location.href = paymentUrl;

      for (const cartItem of saveToCart) {
        removeToCart(cartItem.id);
      }
    } catch (error) {
      console.error(error);
      alert(
        "Une erreur est survenue lors de la création de la session de paiement",
      );
    }
  };

  return { handleSubmit, handleChange, handleDateChange, formData };
}
