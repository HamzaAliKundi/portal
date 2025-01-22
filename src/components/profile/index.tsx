import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Input from '../../common/input';
import Button from '../../common/button';

interface ProfileFormProps {
  currentUser: any; // Replace 'any' with your user type
  register: UseFormRegister<any>;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  errors: FieldErrors<any>;
  watch: any;
  isPending: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  currentUser,
  register,
  handleSubmit,
  onSubmit,
  errors,
  watch,
  isPending
}) => {
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

      {/* Password Change Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="pt-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <Input
              name="oldPassword"
              type="password"
              label="Current Password"
              placeholder="Enter current password"
              register={register}
              validation={{
                required: "Current password is required"
              }}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message?.toString()}</p>
            )}
          </div>

          <div>
            <Input
              name="newPassword"
              type="password"
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
          </div>

          <div>
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="Confirm new password"
              register={register}
              validation={{
                required: "Please confirm your password",
                validate: (value) => 
                  value === watch('newPassword') || "Passwords do not match"
              }}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message?.toString()}</p>
            )}
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