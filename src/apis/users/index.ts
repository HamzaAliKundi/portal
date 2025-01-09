import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import queryClient from './../queryClient';

const fetchUsers = async (params: { page: number; limit: number; sort: string, searchValue: string }) => {
    const { page, limit, sort, searchValue } = params;
    const response = await axiosInstance.get(`/user/`, {
        params: { page, limit, sort, searchValue },
    });
    return response.data;
};
export function useUsersQuery(page: number, limit: number, sort = "createdAt:desc", searchValue: string) {
    return useQuery({
        queryKey: ['users', page, limit, sort],
        queryFn: () => fetchUsers({ page, limit, sort, searchValue }),
    });
}

const deleteUser = async (id: string) => {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
};
export function useDeleteUserMutation() {
    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}