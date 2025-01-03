import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import PublicRoutes from './pages/publicRoutes';
import ProtectedRoutes from './pages/protextedRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
