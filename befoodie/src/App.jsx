import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import "./App.css";
import Home from "./pages/Home/Home";
import Menu from "./pages/Store/Menu";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import UpdateProfile from "./pages/dashboard/UpdateProfile";
import Cart from "./pages/Store/Cart";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/admin/Dashboard";
import Users from "./pages/dashboard/admin/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route
            path="/cart-page"
            element={
              <PrivateRouter>
                <Cart />
              </PrivateRouter>
            }
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <DashboardLayout />
            </PrivateRouter>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
