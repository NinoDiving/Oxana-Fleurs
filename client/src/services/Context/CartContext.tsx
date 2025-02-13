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
  const [saveToCart, setSaveToCart] = useState<ProductProps[]>([]);
  const addToCart = (product: ProductProps) => {
    setSaveToCart((prevProduct) => {
      if (!prevProduct.some((p) => p.id === product.id)) {
        return [...prevProduct, product];
      }
      return prevProduct;
    });
  };

  const removeToCart = (productId: number) => {
    setSaveToCart((prevProduct) =>
      prevProduct.filter((product) => product.id !== productId),
    );
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
