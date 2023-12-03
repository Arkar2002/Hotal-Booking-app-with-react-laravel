import { useMutation } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBooking";

export function useDeleteBooking() {
  const {
    mutate: deleteBooking,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => apiDeleteBooking(id),
  });

  return { deleteBooking, isDeleting, error };
}
