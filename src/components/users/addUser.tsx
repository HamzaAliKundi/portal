import { useForm } from "react-hook-form";
import BreadCrumbs from "../../common/breadCrumbs";
import Input from "../../common/input";
import Button from "../../common/button";
import InputValidationError from "../../common/inputValidationError";
import CancelButton from "../../common/cancelButton";
import { useNavigate } from "react-router-dom";
import { UserFormData } from "../../types/users";
import Dropdown from "../../common/dropdown";

const AddUser = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UserFormData>();

  const navigate = useNavigate();
  console.log(errors);
  
  const onSubmit = (data: UserFormData) => {
    console.log(data);
  };

  return (
    <div className="sm:p-0 md:p-6 lg:p-6">
      <BreadCrumbs
        breadcrumbItems={[
          { name: "Users", link: "/users" },
          { name: "Add User", link: "/users/add" },
        ]}
      />

      <h1 className="text-xl font-medium mb-6">Add User</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full flex flex-wrap gap-3 lg:flex-nowrap">
          <div className="w-full lg:w-1/2">
            <Input<UserFormData>
              name="name"
              label="Name"
              type="text"
              autoFocus={true}
              placeholder="Enter your name"
              register={register}
              validation={{ required: "Name is required." }}
            />
            <InputValidationError message={errors.name?.message} />
          </div>

          <div className="w-full lg:w-1/2">
            <Input<UserFormData>
              name="email"
              label="Email"
              type="email"
              autoFocus={false}
              placeholder="Enter your Email"
              register={register}
              validation={{ required: "Email is required." }}
            />
            <InputValidationError message={errors.email?.message} />
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-3 lg:flex-nowrap mt-4">
          <div className="w-full lg:w-1/2">
            <Input<UserFormData>
              name="password"
              label="Password"
              type="password"
              autoFocus={false}
              placeholder="Enter your password"
              register={register}
              validation={{ required: "Password is required." }}
            />
            <InputValidationError message={errors.password?.message} />
          </div>

          <div className="w-full lg:w-1/2">
            <Input<UserFormData>
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              autoFocus={false}
              placeholder="Confirm your password"
              register={register}
              validation={{ 
                required: "Please confirm your password.",
                validate: (value) => value === watch('password') || "Passwords do not match"
              }}
            />
            <InputValidationError message={errors.confirmPassword?.message} />
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-3 lg:flex-nowrap mt-4">
          <div className="w-full lg:w-1/2">
            <Input<UserFormData>
              name="age"
              label="Age"
              type="number"
              autoFocus={false}
              placeholder="Enter your age"
              register={register}
              validation={{ required: "Age is required." }}
            />
            <InputValidationError message={errors.age?.message} />
          </div>

          <div className="w-full lg:w-1/2">
            <Dropdown<UserFormData>
              name="gender"
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
              ]}
              register={register}
              validation={{ required: "Gender is required." }}
              placeholder="Select Gender"
            />
            <InputValidationError message={errors.gender?.message} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm font-semibold text-gray-700">Something About User</label>
          <textarea
            {...register("aboutYourself")}
            rows={4}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
        <CancelButton onClick={() => navigate(-1)}>Cancel</CancelButton>
          <Button
            type="submit"
            className=""
          >
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
};


export default AddUser;