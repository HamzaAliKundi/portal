import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import PublicRoutes from './pages/publicRoutes';
import ProtectedRoutes from './pages/protextedRoutes';
import Layout from './pages/layout';
import Settings from './pages/settings';
import Profiles from './pages/profiles';
import ForgotPassword from './pages/auth/forgotPassword';
import SuccessPage from './pages/auth/sentMailSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/success" element={<SuccessPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
