import { useCurrentUserQuery } from '../../apis/users';
import ProfileForm from '../../components/profile';

const Profile = () => {
  const { data: currentUser } = useCurrentUserQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Personal Information</h1>
      <ProfileForm currentUser={currentUser} />
    </div>
  );
};

export default Profile;