import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin as apiUpdateCabin } from "../../services/apiCabin";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCabin,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ id, formData }) => apiUpdateCabin(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { updateCabin, isUpdating, error };
}
