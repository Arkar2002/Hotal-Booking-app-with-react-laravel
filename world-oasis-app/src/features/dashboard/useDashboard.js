import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../services/apiDashboard";
import { useSearchParams } from "react-router-dom";

export function useDashboard() {
  const [searchParams] = useSearchParams();
  const last = Number(searchParams.get("last")) || 7;

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", last],
    queryFn: () => getDashboard(last),
  });
  return { data, isLoading, error };
}
