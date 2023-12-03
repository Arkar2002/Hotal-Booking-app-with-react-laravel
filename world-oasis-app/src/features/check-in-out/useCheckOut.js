import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOut as apiCheckOut } from "../../services/apiBooking";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const {
    mutate: checkOut,
    isPending: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: ({ status, bookingId }) => apiCheckOut(status, bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { checkOut, isCheckingOut, error };
}
