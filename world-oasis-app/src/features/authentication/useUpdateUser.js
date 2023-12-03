import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as apiUpdateUser } from "../../services/apiUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending: isUpdatingUser,
    error,
  } = useMutation({
    mutationFn: (name) => apiUpdateUser(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { updateUser, isUpdatingUser, error };
}
