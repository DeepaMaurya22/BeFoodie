import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import "./App.css";
import Home from "./pages/Home/Home";
import Menu from "./pages/Store/Menu";
import SignUp from "./components/SignUp";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import UpdateProfile from "./pages/dashboard/UpdateProfile";
import Cart from "./pages/Store/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          {/* <Route
            path="/menu"
            element={
              <PrivateRouter>
                <Menu />
              </PrivateRouter>
            }
          /> */}
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
      </Routes>
    </Router>
  );
}

export default App;
