import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as apiCreateCabin } from "../../services/apiCabin";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: createCabin,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: apiCreateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { createCabin, isCreating, error };
}
