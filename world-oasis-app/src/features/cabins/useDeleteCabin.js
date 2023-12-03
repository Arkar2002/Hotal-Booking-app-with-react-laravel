import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as apiDeleteCabin } from "../../services/apiCabin";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCabin,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: apiDeleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { deleteCabin, isDeleting, error };
}

export default useDeleteCabin;
