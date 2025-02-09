export interface Product {
  id: string | number;
  product_name: string;
  create_at: string;
  product_description: string;
  product_price: number;
  product_type: string;
  stock: number;
  quantity: number;
}
export interface PaystactProduct {
  id: string | number;
  name: string;
  create_at: string;
  description: string;
  price: number;
  type: string;
  stock: number;
  files: PaystackFile[];
  slug: string;
  quantity: number;
  currency: string;
}

export interface PaystackFile {
  original_filename: string;
  key: string;
  path: string;
}

export interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string | number) => void;
  clearCart: () => void;
  updateQuantity: (productId: string | number, newQuantity: number) => void;
  totalPrice: () => number;
}
export interface ProductState {
  products: Product[];
  fetchProducts: () => Promise<void>;
}
