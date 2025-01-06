const SuccessPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white mx-2 md:mx-0 lg:mx-0 shadow-md rounded-lg p-4 md:p-8 lg:p-8 max-w-md w-full text-center">
                <div className="flex items-center justify-center mb-6">
                    <div className="h-10 w-10 bg-blue-500 rounded-full"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Your request has been sent successfully
                </h2>
                <p className="text-gray-600 mb-6">
                    Kindly check your email. A link to reset your password is attached in it. Thanks.
                </p>
                <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-8 h-8 text-black"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
