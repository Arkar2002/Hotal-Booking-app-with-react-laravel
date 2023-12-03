import { useQuery } from "@tanstack/react-query";
import { getSettings as apiSettings } from "../../services/apiSettings";

export function useSettings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: apiSettings,
  });

  return { data, isLoading, error };
}
