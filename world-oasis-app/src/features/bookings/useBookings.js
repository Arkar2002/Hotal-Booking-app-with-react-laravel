import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // pagination
  const page = Number(searchParams.get("page")) || 1;

  const filterValue = searchParams.get("status") || "all";
  // filter
  const filter = {
    field: "status",
    value: filterValue === "all" ? "" : filterValue,
  };

  // sortBy
  const sortByValue = searchParams.get("sortby") || "start_date-desc";
  const [field, direction] = sortByValue.split("-");
  const sortby = { field, direction };

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", page, filter, sortby],
    queryFn: () => getBookings(page, filter, sortby),
  });

  if (!isLoading) {
    const lastPage = data.meta.last_page;
    if (lastPage !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", page + 1],
        queryFn: () => getBookings(page + 1),
      });
    }
    if (page !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", page - 1],
        queryFn: () => getBookings(page - 1),
      });
    }
  }

  return { data, isLoading, error };
}

export default useBookings;
