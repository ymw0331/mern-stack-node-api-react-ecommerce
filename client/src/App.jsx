import Home from "./pages/Home"
import Menu from "./components/nav/Menu";
import Login from "./pages/Login"
import Register from "./pages/Register"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>

  )
}
