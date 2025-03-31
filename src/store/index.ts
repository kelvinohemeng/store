import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fetchProducts } from "@/lib/utils/supabase";
import {
  CartState,
  ProductState,
  Action,
  SelectedProductState,
  SelectedOrderState,
  Product,
} from "@/lib/types";
import { User } from "@supabase/supabase-js";

export type StoreUser = {
  id: string | number;
  created_at: string;
  email: string;
  role: string;
  display_name: string;
};
type UserT = {
  user: StoreUser | undefined | null;
  setUser: (newUser: StoreUser | undefined | null) => void;
};

export const useUserData = create<UserT>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Remove the global variant selection state
      // selectedVariants: { size: '', color: '' },
      // setSelectedSize: (size: string) => ...,
      // setSelectedColor: (color: string) => ...,
      // resetVariants: () => ...,

      // Modify addItem to accept variants directly
      addItem: (
        product: Product,
        selectedVariants?: { size?: string; color?: string }
      ) =>
        set((state) => {
          // Create product with provided variants
          const productWithVariants = {
            ...product,
            selectedSize: selectedVariants?.size || product.selectedSize,
            selectedColor: selectedVariants?.color || product.selectedColor,
          };

          const existingItem = state.items.find(
            (item) =>
              item.id === productWithVariants.id &&
              item.selectedSize === productWithVariants.selectedSize &&
              item.selectedColor === productWithVariants.selectedColor
          );

          if (existingItem) {
            return {
              ...state,
              items: state.items.map((item) =>
                item.id === productWithVariants.id &&
                item.selectedSize === productWithVariants.selectedSize &&
                item.selectedColor === productWithVariants.selectedColor
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            ...state,
            items: [...state.items, { ...productWithVariants, quantity: 1 }],
          };
        }),

      // ✅ Fixed removeItem: Decrease quantity first, remove only when quantity is 1
      // Modify removeItem to account for variants
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

      // Remove item by ID should also consider variants
      // Remove item by ID and variant
      removeItemById: (productId, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === productId && item.selectedSize === size)
          ),
        })),

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
  // Replace the current setProducts function
  // setProducts: (products) => set({ products }),
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

// Add this to your existing store/index.ts file

// Store for product variant selection
type VariantSelectionState = {
  selectedSize: string;
  selectedColor?: string;
  setSelectedSize: (size: string) => void;
  setSelectedColor: (color: string) => void;
  resetVariantSelection: () => void;
};

export const useVariantSelectionStore = create<VariantSelectionState>(
  (set) => ({
    selectedSize: "",
    selectedColor: "",
    setSelectedSize: (size) => set({ selectedSize: size }),
    setSelectedColor: (color) => set({ selectedColor: color }),
    resetVariantSelection: () => set({ selectedSize: "", selectedColor: "" }),
  })
);
