import { useEffect, useState } from 'react';
import { useDeleteUserMutation, useUsersQuery } from '../../apis/users';
import { Pagination } from 'rsuite';
import { useDebounce } from 'use-debounce';
import DeleteConfirmationModal from '../../common/deleteConfirmationModal';
import UsersTable from '../../components/users';
import LoadingTableSkeleton from '../../common/tableSkelteon';
import SearchTableButton from '../../common/searchTableButton';
import { toast } from 'react-hot-toast';
import "rsuite/dist/rsuite.css";

const Users = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [totalDocs, setTotalDocs] = useState<number>(0)
    const [debouncedSearchValue] = useDebounce(searchValue, 300);
    const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

    const { data: users, isError, isLoading, } = useUsersQuery(page, limit, "createdAt:desc", debouncedSearchValue);
    const { mutate: deleteUser, isPending: isLoadingDeletingUser } = useDeleteUserMutation();

    useEffect(() => {
        if (users?.totalDocs !== undefined) setTotalDocs(users.totalDocs);
    }, [users]);

    const handleInputChange = (value: string) => setSearchValue(value);

    const getSequentialNumber = (index: number) => {
        return (page - 1) * limit + index + 1;
    };

    const handleEdit = (id: string) => { console.log('Editing row with id:', id); };

    const handleDelete = (id: string) => {
        setItemIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = (id: string) => {
        deleteUser(id, {
            onSuccess: () => {
                toast.success('User Deleted!');
                setShowModal(false);
            },
            onError: (error) => {
                toast.error('Error while deleting User!');
            },
        });

    };

    const closeModal = () => setShowModal(false);

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    return (
        <>
            <p className='text-[25px] font-semibold mb-6'>Users</p>
            <div className="pb-6">
                <SearchTableButton
                    placeholder="Type to search..."
                    onChange={handleInputChange}
                    className="w-full max-w-md"
                />
            </div>
            {isLoading ? (
                <LoadingTableSkeleton rowCount={7} columnCount={6} />
            ) : (
                <>
                    <div className='bg-white shadow-md py-5'>
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
                    total={totalDocs || 0}
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
                isLoading={isLoadingDeletingUser}
            />
        </>
    );
};

export default Users;
