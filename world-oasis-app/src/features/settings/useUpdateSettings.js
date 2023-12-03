import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as apiUpdateSettings } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {
    mutate: updateSettings,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: apiUpdateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  return { updateSettings, isUpdating, error };
}
