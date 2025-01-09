import BreadCrumbs from '../../common/breadCrumbs';

const AddUser = () => {
    return (
        <>
            <BreadCrumbs
                breadcrumbItems={[
                    { name: 'Users', link: '/users' },
                    { name: 'Add user', link: '/users' },
                ]}
            />

            <p className='text-[25px] font-semibold mb-6'>Add User</p>
        </>
    )
}

export default AddUser;