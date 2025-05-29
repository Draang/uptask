import { getUser } from "@/api/authApi";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading };
}
