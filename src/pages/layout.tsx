import { NavLink, Outlet } from "react-router-dom";
import { Home, User, Users, Settings } from "lucide-react";
import Navbar from './navbar';

const links = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Users", path: "/users", icon: Users },
  { name: "Profiles", path: "/profiles", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <div className="flex flex-1">
        <aside className="w-1/6 bg-white border-r border-gray-300 shadow-md">
          <nav className="p-4">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded transition-all ${isActive
                        ? "bg-gray-100 border-l-4 border-blue-300 shadow-lg text-blue-500 font-semibold"
                        : "text-gray-700 hover:bg-gray-200"
                      }`
                    }
                  >
                    <link.icon
                      className={`mr-3 h-5 w-5 ${"text-gray-500"
                        }`}
                    />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
