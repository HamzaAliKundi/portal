import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="bg-white shadow-md py-4 px-11 flex items-center justify-between border-b border-gray-300">
            <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center text-gray-700">
                    <img
                        src="https://w7.pngwing.com/pngs/175/27/png-transparent-uniform-logo-brand-web-page-industry-navbar-text-trademark-logo-thumbnail.png"
                        alt="Logo"
                        className="h-8 w-auto"
                    />
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <span
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
                >
                    <LogOut className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Logout</span>
                </span>
            </div>
        </div>
    );
};

export default Navbar;
