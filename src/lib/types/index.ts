export interface Product {
  id: string | number;
  product_name: string;
  create_at: string;
  product_description: string;
  product_price: number;
  product_type: string;
  stock: number;
  quantity: number;
  image_url: string[];
  sizes: string[];
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

export interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string | number) => void;
  clearCart: () => void;
  updateQuantity: (productId: string | number, newQuantity: number) => void;
  totalPrice: () => number;
  totalItems: () => number;
}
export interface ProductState {
  products: Product[];
  setProducts: (product: Product) => void;
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
  selectedOrder: AdminOrderT | undefined | null;
  setSelectedOrder: (order: AdminOrderT) => void;
}

export type Action = "" | "view" | "update" | "create" | "view-order" | "cart";

export interface OrderItem {
  productId: string | number;
  quantity: number;
  price: number;
}

export interface OrderData {
  customerName: string | undefined;
  email: string | undefined;
  items: OrderItem[];
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus: "pending" | "completed" | "failed" | any;
}
