import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProductProps } from "../../types/Product/ProductProps";

export default function FetchProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit", error);
      }
    };
    fetchProduct();
  }, [id]);

  return { product };
}
