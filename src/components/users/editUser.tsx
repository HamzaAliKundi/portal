import { useParams } from "react-router-dom";
import BreadCrumbs from "../../common/breadCrumbs";

const EditUser = () => {
  const { id } = useParams();

  return (
    <>
      <BreadCrumbs
        breadcrumbItems={[
          { name: "Users", link: "/users" },
          { name: "Edit user", link: "/users" },
        ]}
      />
      <p className="text-[25px] font-semibold mb-6">Edit User</p>
    </>
  );
};

export default EditUser;
