import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIn as apiCheckIn } from "../../services/apiBooking";
import { useParams } from "react-router-dom";

export function useCheckIn() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: checkIn,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: (checkInData) => apiCheckIn(checkInData, bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries(["booking-detail", bookingId]);
    },
  });

  return { checkIn, isCheckingIn, error };
}
