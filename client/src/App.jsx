import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Home from "./pages/Home"
import Menu from "./components/nav/Menu";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";

const PageNotFound = () => {
  return <div className="d-flex justify-content-center align-items-center vh-100">404 | Page Not Found</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* wrap dashboard into private for only authenticated users */}
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} replace />

      </Routes>
    </BrowserRouter>
  )
}
