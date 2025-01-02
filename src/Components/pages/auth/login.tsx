import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from '../../common/input';
import InputValidationError from '../../common/input-validation-error';
import { IFormInput } from '../../interface/login-interface';
import Button from '../../common/button';
import { useLoginMutation } from '../../apis/auth';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { mutate: login, } = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const togglePasswordVisibility = () => setPasswordVisible((prevState) => !prevState);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    login(data, {
      onSuccess: (res) => { console.log(res) },
      onError: (err) => { console.log(err) }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full mx-2 lg:mx-0 max-w-lg bg-white rounded-lg shadow-sm py-10 px-4 lg:py-16 lg:px-12">
        <div className="flex justify-center mb-12">
          <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">🔒</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Input<IFormInput>
              name="email"
              type="email"
              placeholder="Enter your email"
              register={register}
              validation={{ required: "Email is required." }}
            />
            <InputValidationError message={errors.email?.message} />
          </div>

          <div className="mb-4 relative">
            <div className="relative">
              <Input<IFormInput>
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                register={register}
                validation={{ required: "Password is required." }}
                className="pr-10"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {passwordVisible ? (
                  <AiFillEyeInvisible className="text-gray-500" size={20} />
                ) : (
                  <AiFillEye className="text-gray-500" size={20} />
                )}
              </span>
            </div>
            <InputValidationError message={errors.password?.message} />
          </div>

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              {/* <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
                className="w-4 h-4 text-blue-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-700 text-sm">
                Remember me
              </label> */}
            </div>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Forgot password?
            </a>
          </div>

          <div className="w-full">
            <Button type="submit" className='w-full'>
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
