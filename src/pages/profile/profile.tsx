import { useCurrentUserQuery } from '../../apis/users';
import { useChangePasswordMutation } from '../../apis/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ProfileForm from '../../components/profile';

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const { data: currentUser } = useCurrentUserQuery();
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<PasswordFormData>();
  const { mutate: changePassword, isPending } = useChangePasswordMutation();

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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Personal Information</h1>
      <ProfileForm 
        currentUser={currentUser}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        watch={watch}
        isPending={isPending}
      />
    </div>
  );
};

export default Profile;