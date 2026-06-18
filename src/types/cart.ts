import type { Product } from './product';

export type CartItem = {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  userId: string;
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
};

export type AddToCartPayload = {
  productId: string;
  quantity?: number;
};
