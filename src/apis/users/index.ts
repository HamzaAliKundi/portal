import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import queryClient from "./../queryClient";

const USERS_QUERY_KEY = "users" as const;
const CURRENT_USER_QUERY_KEY = "currentUser" as const;

const fetchUsers = async (params: {
  page: number;
  limit: number;
  sort: string;
  searchValue: string;
}) => {
  const { page, limit, sort, searchValue } = params;
  const response = await axiosInstance.get(`/user/`, {
    params: { page, limit, sort, searchValue },
  });
  return response.data;
};

export function useUsersQuery(
  page: number,
  limit: number,
  sort = "createdAt:desc",
  searchValue: string
) {
  const params = { page, limit, sort, searchValue };
  return useQuery({
    queryKey: [USERS_QUERY_KEY, params],
    queryFn: () => fetchUsers(params),
  });
}

const fetchCurrentUser = async () => {
  const response = await axiosInstance.get('/user/current-user/info');
  return response.data;
};
export function useCurrentUserQuery() {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUser
  });
}

const deleteUser = async (id: string) => {
  await axiosInstance.delete(`/user/${id}`);
};
export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
        exact: false,
        refetchType: "active",
      });
    },
  });
}
