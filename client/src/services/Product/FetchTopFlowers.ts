import { useEffect, useState } from "react";
import type { ProductProps } from "../../types/Product/ProductProps";

export default function FetchTopProductsFlowers() {
  const [topProductFlowers, setTopProductFlowers] = useState<ProductProps[]>(
    [],
  );
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/top-products`,
        );
        const data = await response.json();
        setTopProductFlowers(
          data.filter((product: ProductProps) => product.type === "fleurs"),
        );
      } catch (error) {
        console.error("Erreur lors de la récupération du produit", error);
      }
    };
    fetchProduct();
  }, []);

  return { topProductFlowers };
}
