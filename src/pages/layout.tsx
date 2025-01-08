import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, User, Users, Settings } from "lucide-react";
import Navbar from './navbar';
import { Menu, X } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Users", path: "/users", icon: Users },
  { name: "Profiles", path: "/profiles", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <div className="flex flex-1">
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-[300px] bg-white border-r border-gray-300 shadow-md transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0 md:relative`}
        >
          <nav className="px-4 pt-9 md:pt-2 lg:pt-4">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded transition-all ${isActive
                        ? "!bg-gray-100 !border-l-4 !border-blue-300 !shadow-lg !text-blue-500 !no-underline !font-semibold"
                        : "!text-gray-700 !hover:bg-gray-200 !no-underline"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <link.icon
                          className={`!mr-3 !no-underline !h-5 !w-5 transition-colors ${isActive ? "!text-blue-500" : "!text-gray-500"
                            }`}
                        />
                        {link.name}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}

            </ul>
          </nav>
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-600 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </aside>

        <main
          className={`flex-1 p-6 bg-gray-50 ${isSidebarOpen
            ? "opacity-50 pointer-events-none md:opacity-100 md:pointer-events-auto"
            : ""
            }`}
        >
          <button
            onClick={toggleSidebar}
            className="absolute top-16 left-1 z-30 text-gray-600 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
