import { useState } from 'react';
import { useUsersQuery } from '../../apis/users'

const Users = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data: users, isError, isLoading } = useUsersQuery(page, limit, "createdAt:desc");

    return (
        <>
            <div>Users</div>
        </>
    )
}

export default Users