// Helper function to format amount

import { QueryClient } from "@tanstack/react-query";
import { RefObject } from "react";

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatCurrencyGHC = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHC",
  }).format(amount);
};

export const invalidateQueryKey = async (
  queryClient: QueryClient,
  key: string
) => {
  await queryClient.invalidateQueries({ queryKey: [key] });

  return {
    queryKey: [key],
    refetchInterval: 1000,
  };
};

export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleString("en-US", {
    month: "short",
  })}, ${date.getFullYear()}`;
};

export function useScrollToTopOnView(
  state: string,
  containerRef: RefObject<HTMLDivElement | null>
) {
  const scrollToTopStates = ["view", "update", "view-order", "create"];
  if (scrollToTopStates.includes(state) && containerRef.current) {
    containerRef.current.scrollTop = 0; // Scroll to top when component becomes active
  }
}
