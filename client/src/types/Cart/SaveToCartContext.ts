import type { ProductProps } from "../Product/ProductProps";

export type Props = {
  children: React.ReactNode;
};

export type SaveToCartContextProps = {
  saveToCart: ProductProps[];
  addToCart: (product: ProductProps) => void;
  removeToCart: (productId: number) => void;
  isProductSaved: (productId: number) => boolean;
};
