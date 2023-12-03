import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiUser";

export function useLogin() {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: (user) => apiLogin(user),
    onSuccess: (data) => {
      if (data.status !== "fail") {
        queryClient.setQueryData(["user"], {
          name: data.name,
          email: data.email,
        });
      }
    },
  });
  return { login, error, isPending };
}
