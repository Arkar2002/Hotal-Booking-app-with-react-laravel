import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPassword as apiUpdatePassword } from "../../services/apiUser";

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUserPassword,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (passwordObj) => apiUpdatePassword(passwordObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { updateUserPassword, isUpdating, error };
}
