import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBooking";
import { useParams } from "react-router-dom";

function useBookingDetails() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking-detail", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { booking, isLoading, error };
}

export default useBookingDetails;
