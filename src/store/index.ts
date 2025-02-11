import { create } from "zustand";
import { fetchProducts } from "@/lib/utils/supabase";
import { CartState, ProductState, Product } from "@/lib/types";

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  // Add item with quantity handling
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),
  // Remove item completely
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  // Update quantity for specific item
  updateQuantity: (productId, newQuantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure minimum 1
          : item
      ),
    })),
  // Clear all items
  clearCart: () => set({ items: [] }),
  // Calculated total price (automatically updates when items change)
  totalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    ),
  // Get total number of items in cart (sum of quantities)
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  fetchProducts: async () => {
    try {
      const data = await fetchProducts(); // Fetch products from Supabase
      set({ products: data }); // Update the state with fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));

type State = {
  state: boolean;
  setState: (newState: boolean) => void;
};

export const useProductSlideState = create<State>((set) => ({
  state: false,
  setState: (newState) => set({ state: newState }),
}));
