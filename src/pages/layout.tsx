import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, User, Users, Settings } from "lucide-react";
import Navbar from "./navbar";
import { Menu, X } from "lucide-react";
import SideNav from "./sideNav";

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
        <SideNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`flex-1 p-6 bg-gray-50 ${
            isSidebarOpen
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
