import { useEffect, useState } from "react";
import type { ProductProps } from "../types/Product/ProductProps";

export default function FetchDataFlowers() {
  const [flowers, setFlowers] = useState<ProductProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products`,
        );
        const data = await response.json();

        setFlowers(
          data.filter((product: ProductProps) => product.type === "fleurs"),
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
    fetchData();
  }, []);
  return { flowers };
}
