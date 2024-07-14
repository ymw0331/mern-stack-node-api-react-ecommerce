import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Home from "./pages/Home"
import Menu from "./components/nav/Menu";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";


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
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} /> 
          <Route path="user/orders" element={<UserOrders />} />

        </Route>

        <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} replace />

      </Routes>
    </BrowserRouter>
  )
}
