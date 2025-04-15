import { useEffect, useState } from "react";
import type { ProductProps } from "../../../types/Product/ProductProps";
import "./orders.css";
import BackOfficeNav from "../BackOfficeNav";
type Order = {
  id: number;
  customer_name: string;
  isClickandCollect: boolean;
  delivery_date: string;
  total_price: number;
  customer_address: string;
  customer_zip_code: string;
  customer_city: string;
  customer_phone: string;
  products: ProductProps[];
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        });
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes");
    }
  }, []);
  return (
    <>
      <BackOfficeNav />
      <main className="orders-container">
        <h1>Vos commandes</h1>
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <h2>{order.customer_name}</h2>
            <p>
              Type de commande:{" "}
              {order.isClickandCollect ? "Livraison" : "Retrait"}
            </p>
            <p>Adresse: {order.customer_address}</p>
            <p>Code postal: {order.customer_zip_code}</p>
            <p>Ville: {order.customer_city}</p>
            <p>Téléphone: {order.customer_phone}</p>
            <p>Date de livraison: {order.delivery_date}</p>
            <div className="products-container">
              {order.products.map((product) => (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <img
                    src={`${import.meta.env.VITE_URL}${product.img_path}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <p>Prix total : {order.total_price}€</p>
          </article>
        ))}
      </main>
    </>
  );
}
