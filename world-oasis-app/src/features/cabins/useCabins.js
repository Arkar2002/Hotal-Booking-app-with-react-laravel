import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins(page),
  });

  const lastPage = data.meta?.last_page;

  if (!isLoading) {
    if (page !== lastPage) {
      queryClient.prefetchQuery({
        queryKey: ["cabins", page + 1],
        queryFn: () => getCabins(page + 1),
      });
    }

    if (page !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["cabins", page - 1],
        queryFn: () => getCabins(page - 1),
      });
    }
  }

  return { data, isLoading, error };
}
