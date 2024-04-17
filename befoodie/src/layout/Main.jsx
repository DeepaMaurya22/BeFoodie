import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

function Main() {
  const { loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar />
          <Outlet />
          <p>Footer</p>
        </div>
      )}
    </div>
  );
}

export default Main;
