import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Main() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <p>Footer</p>
    </div>
  );
}

export default Main;
