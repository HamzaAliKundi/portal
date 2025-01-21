import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import Button from "../common/button";
import { useCurrentUserQuery } from "../apis/users";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUserQuery();

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsLoading(false);
      setIsModalOpen(false);
      navigate("/");
    }, 2000);
  };

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
        <div className="flex items-center mr-4">
          <User className="h-5 w-5 text-gray-700 mr-2" />
          <span className="text-gray-700 font-semibold">
            {currentUser?.name || 'User'}
          </span>
        </div>
        <span
          onClick={() => setIsModalOpen(true)}
          className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span className="font-semibold">Logout</span>
        </span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-white w-96 mx-4 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <Button
                onClick={handleLogout}
                type="button"
                isLoading={isLoading}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
