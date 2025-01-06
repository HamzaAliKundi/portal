import { useState } from 'react';
import { useUsersQuery } from '../../apis/users';
import { Pagination, Loader } from 'rsuite';
import "rsuite/dist/rsuite.css";
import DeleteConfirmationModal from '../../common/deleteConfirmationModal';
import UsersTable from '../../components/users';
import LoadingTableSkeleton from '../../common/tableSkelteon';

const Users = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

    const { data: users, isError, isLoading } = useUsersQuery(page, limit, "createdAt:desc");

    const getSequentialNumber = (index: number) => {
        return (page - 1) * limit + index + 1;
    };

    const handleEdit = (id: string) => { console.log('Editing row with id:', id); };

    const handleDelete = (id: string) => {
        setItemIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = (id: string) => {
        console.log('Deleted item with ID:', id);
        setShowModal(false);
    };

    const closeModal = () => setShowModal(false);

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    return (
        <>
            <p className='text-[25px] font-semibold mb-6'>Users</p>
            {isLoading ? (
                <LoadingTableSkeleton rowCount={7} columnCount={6} />
            ) : (
                <>
                    <div className='bg-white py-5'>
                        <UsersTable
                            data={users?.docs || []}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            getSequentialNumber={getSequentialNumber}
                        />
                    </div>
                </>
            )}

            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={10}
                    size="md"
                    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={users?.totalDocs || 0}
                    limitOptions={[10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>

            <DeleteConfirmationModal
                showModal={showModal}
                onClose={closeModal}
                onConfirm={confirmDelete}
                itemId={itemIdToDelete}
            />
        </>
    );
};

export default Users;
