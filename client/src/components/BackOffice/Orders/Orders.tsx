import { useEffect, useState } from "react";
import type { Order } from "../../../types/Cart/Order";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_URL}cart`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes");
    }
  }, []);
  return (
    <main>
      <h1>Vos commandes</h1>
      {orders.map((order) => (
        <article key={order.id}>
          <h2>{order.isGuest === 0 ? order.lastname : "utilisateur invité"}</h2>
        </article>
      ))}
    </main>
  );
}
