import { create } from "zustand";

interface OrderStore {
  orders: Record<string, string>; // Stores order statuses by ID
  updateOrderStatus: (id: string, status: string) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: {}, // Keeps track of updated orders

  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: { ...state.orders, [id]: status }, // Update specific order
    })),
}));
