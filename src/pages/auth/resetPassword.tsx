import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../common/button";
import Input from "../../common/input";
import InputValidationError from "../../common/inputValidationError";
import { IResetPasswordForm } from "../../types/auth";

const ResetPassword = () => {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordForm>();

  const handleResetPassword: SubmitHandler<IResetPasswordForm> = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    navigate("/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-2 md:mx-0 lg:mx-0 w-full max-w-md p-4 lg:p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://w7.pngwing.com/pngs/175/27/png-transparent-uniform-logo-brand-web-page-industry-navbar-text-trademark-logo-thumbnail.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="mb-4">
            <Input<IResetPasswordForm>
              name="oldPassword"
              label="Old Password"
              type="password"
              placeholder="Enter your old password"
              register={register}
              validation={{ required: "Old password is required." }}
            />
            <InputValidationError message={errors.oldPassword?.message} />
          </div>

          <div className="mb-4">
            <Input<IResetPasswordForm>
              name="newPassword"
              label="New Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              register={register}
              validation={{
                required: "New password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
              }}
            />
            <InputValidationError message={errors.newPassword?.message} />
          </div>

          <div className="mb-4">
            <Input<IResetPasswordForm>
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              register={register}
              validation={{
                required: "Confirm password is required.",
              }}
            />
            <InputValidationError message={errors.confirmPassword?.message} />
          </div>

          {error && <InputValidationError message={error} />}

          <div className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPassword"
              className="h-4 w-4"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show Password
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
