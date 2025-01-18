import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import PublicRoutes from "./pages/publicRoutes";
import ProtectedRoutes from "./pages/protextedRoutes";
import Layout from "./pages/layout";
import Settings from "./pages/settings";
import Profiles from "./pages/profiles";
import ForgotPassword from "./pages/auth/forgotPassword";
import SuccessPage from "./pages/auth/sentMailSuccess";
import ResetPassword from "./pages/auth/resetPassword";
import { Toaster } from "react-hot-toast";
import EditUser from "./components/users/editUser";
import AddUser from "./components/users/addUser";
import Reports from "./pages/reports/dailyReports";
import Analytics from "./pages/reports/analytics";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/edit/:id" element={<EditUser />} />

            <Route path="/reports/daily" element={<Reports />} />
            <Route path="/reports/analytics" element={<Analytics />} />

            <Route path="settings" element={<Settings />} />

            <Route path="profiles" element={<Profiles />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
