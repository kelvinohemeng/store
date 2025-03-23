// Helper function to format amount

import { QueryClient } from "@tanstack/react-query";

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
