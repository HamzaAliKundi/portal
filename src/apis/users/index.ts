import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';

const fetchUsers = async (params: { page: number; limit: number; sort: string }) => {
    try {
        const { page, limit, sort } = params;
        const response = await axiosInstance.get(`/user/`, {
            params: { page, limit, sort },
        });
        return response.data;
    } catch (error) {
        throw new Error("An unexpected error occurred while fetching users");
    }
};

export function useUsersQuery(page = 1, limit = 10, sort = "createdAt:desc") {
    return useQuery({
        queryKey: ['users', page, limit, sort],
        queryFn: () => fetchUsers({ page, limit, sort }),
    });

}
