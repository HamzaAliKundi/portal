import { useEffect, useState } from 'react';
import { useUsersQuery } from '../../apis/users';
import { Pagination, Loader } from 'rsuite';
import "rsuite/dist/rsuite.css";
import DeleteConfirmationModal from '../../common/deleteConfirmationModal';
import UsersTable from '../../components/users';
import LoadingTableSkeleton from '../../common/tableSkelteon';
import SearchTableButton from '../../common/searchTableButton';

const Users = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [totalDocs, setTotalDocs] = useState<number>(0)
    const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

    const { data: users, isError, isLoading } = useUsersQuery(page, limit, "createdAt:desc");
    useEffect(() => {
        setTotalDocs(users?.totalDocs)
    }, []);

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

    const handleInputChange = (value: string) => {
        setSearchQuery(value);
        console.log("Search query updated:", value);
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
            />
        </>
    );
};

export default Users;
