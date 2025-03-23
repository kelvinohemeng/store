export interface Product {
  id: string | number;
  product_name: string;
  create_at: string;
  product_description: string;
  product_price: number;
  product_type: string;
  quantity: number;
  image_url: string[];
  sizes: string[];
  compare_price: number;
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
  id: string | number;
  created_ay: string;
  order_id: string | number;
  product_id: string | number;
  product_name: string;
  quantity: number;
  price: number;
  product_images?: string[]; // Optional: store the image URL of the selected product
  variants?: Record<string, any>;
  product?: Product;
}

export interface OrderData {
  id: number | string;
  created_at: string;
  customer_name: string | undefined;
  email: string | undefined;
  paystack_reference?: string;
  order_items: OrderItem[];
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  payment_status: "pending" | "completed" | "failed" | any;
  orderNotes?: string; // Optional notes from customer
  total_amount: number; // Total order amount
  order_status?: "pending" | "delivered" | any;
}
