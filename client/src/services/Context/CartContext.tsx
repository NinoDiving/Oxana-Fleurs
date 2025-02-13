import { createContext, useContext, useState } from "react";
import type {
  Props,
  SaveToCartContextProps,
} from "../../types/Cart/SaveToCartContext";
import type { ProductProps } from "../../types/Product/ProductProps";

const SaveToCartContext = createContext<SaveToCartContextProps | undefined>(
  undefined,
);

export function SaveToCartProvider({ children }: Props) {
  const [saveToCart, setSaveToCart] = useState<ProductProps[]>(() => {
    const savedProducts = localStorage.getItem("saveToCart");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const addToCart = (product: ProductProps) => {
    setSaveToCart((prevProduct) => {
      const updatedProducts = prevProduct.some((p) => p.id === product.id)
        ? prevProduct
        : [...prevProduct, product];
      localStorage.setItem("saveToCart", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const removeToCart = (productId: number) => {
    setSaveToCart((prevProduct) => {
      const updatedProducts = prevProduct.filter(
        (product) => product.id !== productId,
      );
      localStorage.setItem("saveToCart", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const isProductSaved = (productId: number) => {
    return saveToCart.some((product) => product.id === productId);
  };

  const value = {
    saveToCart,
    addToCart,
    removeToCart,
    isProductSaved,
  };

  return (
    <SaveToCartContext.Provider value={value}>
      {children}
    </SaveToCartContext.Provider>
  );
}

export function useSaveToCart() {
  const context = useContext(SaveToCartContext);

  if (!context) {
    throw new Error(
      "useSaveCards doit être utilisé à l'intérieur de SaveCardsProvider",
    );
  }

  return context;
}
