import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import { LoginCredentials, LoginResponse } from './types';

const login = async (credentials: LoginCredentials) => {
    try {
        const response = await axiosInstance.post("/auth/signin", credentials);
        return response.data;
    } catch (error) {
        throw new Error("An unexpected error occurred");
    }
};

export function useLoginMutation() {
    return useMutation<any, Error, LoginCredentials>({
        mutationFn: login,
    })
}

const forgotPassword = async (data: { email: string }): Promise<{ message: string }> => {
    try {
        const response = await axiosInstance.post<{ message: string }>("/auth/forgot-password", data);
        return response.data;
    } catch (error) {
        throw new Error("An unexpected error occurred");
    }
};

export function useForgotPasswordMutation() {
    return useMutation<{ message: string }, unknown, { email: string }>({
        mutationFn: forgotPassword,
    });
}