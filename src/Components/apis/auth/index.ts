import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import { LoginCredentials, LoginResponse } from './types';

export const useLoginMutation = () => {
    console.log("heloooooooooooooooo")
    return useMutation<LoginResponse, Error, LoginCredentials>(
        async (data: LoginCredentials) => {
            console.log("fuck")
            const response = await axiosInstance.post('/auth/admin/login', data);
            return response.data;
        }
    );
};