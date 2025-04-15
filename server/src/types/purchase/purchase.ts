export type PurchaseItem = {
  quantity: number;
  price: number;
  productId: number;
};

export type Purchase = {
  id: number;
  name: string;
  type_id: number;
  description: string;
  price: number;
  img_path: string;
  purchase: PurchaseItem[];
};
