import { useEffect } from 'react';
import { useCurrentUserQuery } from '../../apis/users';

const Profile = () => {
  const { data: currentUser } = useCurrentUserQuery();

  console.log(currentUser);
  

  return (
    <>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Info</h1>
    </>
  );
};

export default Profile;