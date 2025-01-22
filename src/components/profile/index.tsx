import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../common/input';
import Button from '../../common/button';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useChangePasswordMutation } from '../../apis/auth';
import toast from 'react-hot-toast';
import InputValidationError from '../../common/inputValidationError';

interface ProfileFormProps {
  currentUser: any;
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ currentUser }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { mutate: changePassword, isPending } = useChangePasswordMutation();
  
  const { register, handleSubmit, formState: { errors }, watch, setError, reset } = useForm<PasswordFormData>();

  const onSubmit = (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }, {
      onSuccess: () => {
        toast.success('Password changed successfully');
        reset(); // Clear all form fields
      },
      onError: (error: any) => {
        if (error.response?.data?.message === 'Your current password is not correct.') {
          setError('oldPassword', {
            type: 'manual',
            message: 'Your current password is not correct'
          });
        } else {
          toast.error(error.message || 'Failed to change password');
        }
      }
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
          <input 
            type="text"
            defaultValue={currentUser?.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input 
            type="email"
            defaultValue={currentUser?.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel"
            defaultValue={currentUser?.phoneNumber?.toString()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
          <input 
            type="text"
            defaultValue={currentUser?.role?.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            disabled
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <div className="relative">
              <Input
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                label="Current Password"
                placeholder="Enter current password"
                register={register}
                validation={{
                  required: "Current password is required"
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-7 text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiFillEye className="h-5 w-5" />
                )}
              </button>
            </div>
            <InputValidationError message={errors.oldPassword?.message} />
          </div>

          <div>
            <div className="relative">
              <Input
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                placeholder="Enter new password"
                register={register}
                validation={{
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-7 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiFillEye className="h-5 w-5" />
                )}
              </button>
            </div>
            <InputValidationError message={errors.newPassword?.message} />
          </div>

          <div>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm New Password"
                placeholder="Confirm new password"
                register={register}
                validation={{
                  required: "Please confirm your password",
                  validate: (value) => 
                    value === watch('newPassword') || "Passwords do not match"
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-7 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiFillEye className="h-5 w-5" />
                )}
              </button>
            </div>
            <InputValidationError message={errors.confirmPassword?.message} />
          </div>
        </div>

        <Button 
          type="submit"
          className="mt-6"
          isLoading={isPending}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;