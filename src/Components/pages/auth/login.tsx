import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const togglePasswordVisibility = () => setPasswordVisible((prevState) => !prevState);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsLoading(true); // Start loading
    console.log("Form submitted", data);

    // Simulate a 5-second delay
    setTimeout(() => {
      setIsLoading(false); // Stop loading after 5 seconds
      console.log("Login successful");
    }, 5000);
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
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required." })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required." })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
            )}
          </div>

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
                className="w-4 h-4 text-blue-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-700 text-sm">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Forgot password?
            </a>
          </div>

          <div className="w-full">
            <button
              type="submit"
              disabled={isLoading} // Disable button when loading
              className="w-full bg-blue-500 text-white py-2 px-4 font-medium rounded-lg hover:bg-blue-600 transition-all duration-500 ease-in-out"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <AiOutlineLoading3Quarters className="animate-spin mx-2" size={24} />
                  <span className="animate-wiggle text-sm">Wait...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
