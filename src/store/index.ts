import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fetchProducts } from "@/lib/utils/supabase";
import {
  CartState,
  ProductState,
  Action,
  SelectedProductState,
  SelectedOrderState,
} from "@/lib/types";
import { User } from "@supabase/supabase-js";

type UserT = {
  user: User | undefined | null;
  setUser: (newUser: User | undefined | null) => void;
  role: string;
  setRole: (role: string) => void;
};

export const useUserData = create<UserT>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  role: "user",
  setRole: (newRole) => set({ role: newRole }),
}));

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item with quantity handling
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

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

      // ✅ Fixed removeItem: Decrease quantity first, remove only when quantity is 1
      removeItem: (productId) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === productId
          );

          if (existingItem) {
            if (existingItem.quantity > 1) {
              // If quantity > 1, decrease quantity
              return {
                items: state.items.map((item) =>
                  item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              };
            } else {
              // If quantity is 1, remove item from cart
              return {
                items: state.items.filter((item) => item.id !== productId),
              };
            }
          }

          return state; // If item doesn't exist, return current state
        }),

      // Update quantity for a specific item
      updateQuantity: (productId, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure min 1
              : item
          ),
        })),

      // Clear all items
      clearCart: () => set({ items: [] }),

      // Calculate total price
      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.product_price * item.quantity,
          0
        ),

      // Get total number of items in cart (sum of quantities)
      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "cart-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export const useProductStore = create<ProductState>((set, get) => ({
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
    return get().products;
  },
}));

type SlideState = {
  state: Action;
  setState: (newState: Action) => void;
};

export const useSlide = create<SlideState>((set) => ({
  state: "",
  setState: (newState) => set({ state: newState }),
}));

export const useSelectedState = create<SelectedProductState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));

export const useSelectedOrder = create<SelectedOrderState>((set) => ({
  selectedOrder: null,
  setSelectedOrder: (order) => set({ selectedOrder: order }),
}));
