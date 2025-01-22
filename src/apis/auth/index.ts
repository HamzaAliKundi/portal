import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { LoginCredentials, LoginResponse } from "./types";

const login = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post("/auth/signin", credentials);
  return response.data;
};
export function useLoginMutation() {
  return useMutation<any, Error, LoginCredentials>({
    mutationFn: login,
  });
}

const forgotPassword = async (data: {
  email: string;
}): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>(
    "/auth/forgot-password",
    data
  );
  return response.data;
};
export function useForgotPasswordMutation() {
  return useMutation<{ message: string }, Error, { email: string }>({
    mutationFn: forgotPassword,
  });
}

const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  const response = await axiosInstance.patch("/user/change-password", data);
  return response.data;
};

export function useChangePasswordMutation() {
  return useMutation<any, Error, { oldPassword: string; newPassword: string }>({
    mutationFn: changePassword,
  });
}
