import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/button';
import { useForgotPasswordMutation } from '../../apis/auth';
import InputValidationError from '../../common/inputValidationError';
import Input from '../../common/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IForgotPasswordEmail } from '../../types/login-interface';

const ForgotPassword = () => {
    const [error, setError] = useState<string>("");
    const [resent, setResent] = useState<boolean>(false);

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<IForgotPasswordEmail>();
    const { mutate: forgotPassword, isPending } = useForgotPasswordMutation();
    const handleForgotPassword: SubmitHandler<IForgotPasswordEmail> = (data) => {
        forgotPassword(
            { email: data.email },
            {
                onSuccess: (res: any) => { navigate("/success"); },
                // @ts-ignore
                onError: (error) => { setError(error?.message); },
            }
        );
    };

    console.log(error)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white mx-2 md:mx-0 lg:mx-0 w-full max-w-md p-4 lg:p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <Link
                        to="/"
                        className="text-blue-500 flex items-center space-x-2"
                    >
                        <span className="text-lg">&larr;</span>
                        <span>Back</span>
                    </Link>
                </div>

                <div className="flex justify-center mb-6">
                    <img
                        src="https://w7.pngwing.com/pngs/175/27/png-transparent-uniform-logo-brand-web-page-industry-navbar-text-trademark-logo-thumbnail.png"
                        alt="Logo"
                        className="h-12 w-auto"
                    />
                </div>

                <h2 className="text-center text-2xl font-bold mb-6">Forget Password</h2>

                <form onSubmit={handleSubmit(handleForgotPassword)}>
                    <div className="mb-4">

                        <Input<IForgotPasswordEmail>
                            name="email"
                            label='Email Address'
                            type="email"
                            autoFocus={true}
                            placeholder="Enter your email"
                            register={register}
                            validation={{ required: "Email is required." }}
                        />
                        <InputValidationError message={errors.email?.message} />
                    </div>

                    <div className="mb-6 text-sm">
                        Not Received?{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setResent(true);
                                handleSubmit(handleForgotPassword)();
                            }}
                            className="text-blue-500 hover:underline"
                        >
                            {resent ? (isPending ? "Sending..." : "Resent") : "Resend"}
                        </a>
                    </div>

                    <Button
                        type="submit"
                        isLoading={isPending}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                    >
                        Send Email
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
