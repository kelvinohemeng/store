export interface Product {
  id: string | number;
  product_name: string;
  created_at: string | Date;
  product_description: string;
  product_price: number;
  product_type: string;
  quantity: number;
  image_url: string[];
  sizes: string[];
  compare_price: number | null;
  selectedSize?: string;
  selectedColor?: string;
}

export type file = {
  file: {
    normalFile: string;
    blobExtension: string;
  };
};
export interface PaystackProduct {
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
export type CartItemT = {
  id: string | number;
};

export interface CartState {
  items: Product[];
  addItem: (
    product: Product,
    selectedVariants?: {
      size?: string;
      color?: string;
    }
  ) => void;
  removeItem: (productId: string | number) => void;
  removeItemById: (
    productId: string | number,
    size?: string | undefined
  ) => void;
  clearCart: () => void;
  updateQuantity: (productId: string | number, newQuantity: number) => void;
  totalPrice: () => number;
  totalItems: () => number;
  // True once zustand/persist has rehydrated `items` from localStorage on
  // the client. Always false during SSR and the first client render —
  // gate any always-visible cart-derived UI (cart count badge) on this so
  // that first render matches the server instead of jumping right after
  // mount and tripping a hydration-mismatch warning.
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}
export interface ProductState {
  products: Product[];
  setProducts?: (products: Product[]) => void;
  fetchProducts: () => Promise<Product[]>;
}

export type DeliveryAddress = {
  city: string;
  state: string;
  street: string;
  country: string;
  postalCode: string;
};
export interface AdminOrderItemT {
  id: string | number;
  created_at: string;
  order_id: string | number;
  product: Product;
  quantity: number;
  price: number;
}
export type AdminOrderT = {
  id: number | string;
  customer_name: string;
  email: string;
  payment_status: string;
  created_at: string;
  quantity: number;
  delivery_address: DeliveryAddress;
  order_items: AdminOrderItemT[];
};

export interface SelectedProductState {
  selectedProduct: Product | undefined | null;
  setSelectedProduct: (product: Product) => void;
}
export interface SelectedOrderState {
  selectedOrder: OrderData | undefined | null;
  setSelectedOrder: (order: OrderData) => void;
}

export type Action = "" | "view" | "update" | "create" | "view-order" | "cart";

export interface ProductVariant {
  size?: string;
  color?: string;
  style?: string;
  // Add other variant types as needed
}

export interface OrderItem {
  id?: string | number;
  created_at?: string | Date;
  order_id?: string | number;
  product_id?: string | number | null;
  quantity: number;
  price: number;
  variants?: Record<string, any> | null;
  product?: Product | null;
}

export interface OrderData {
  id?: string | number;
  created_at?: string | Date;
  customer_name: string | null | undefined;
  email: string | null | undefined;
  paystack_reference?: string | null;
  order_items: OrderItem[];
  delivery_address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } | null;
  payment_status: "pending" | "completed" | "failed" | any;
  order_note?: string | null; // Optional notes from customer
  total_amount: number; // Total order amount
  order_status?: "pending" | "delivered" | any;
}
