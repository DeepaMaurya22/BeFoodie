import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  FaShoppingBag,
  FaPlusCircle,
  FaEdit,
  FaRegUser,
  FaUsers,
  FaShoppingCart,
  FaLocationArrow,
  FaQuestionCircle,
} from "react-icons/fa";
import logo from "../assets/BeFoodi_brand_logo.png";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

function DashboardLayout() {
  const SharedLinks = (
    <>
      <li>
        <Link to="/">
          <MdDashboard /> Home
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <FaShoppingCart /> Menu
        </Link>
      </li>
      <li>
        <Link to="/">
          <FaLocationArrow /> Orders Tracking
        </Link>
      </li>
      <li>
        <Link to="/">
          <FaQuestionCircle /> Customer Support
        </Link>
      </li>
    </>
  );
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start justify-start">
              <div className="flex justify-between items-center mx-auto w-full p-3">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  <MdDashboard />
                </label>
                <button className="btn rounded-full bg-red text-white sm:hidden ml-auto">
                  <FaRegUser />
                  Logout
                </button>
              </div>
              <div className="mt-5 md:mt-2 mx-4">
                <Outlet />
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <Link to="/dashboard" className="flex justify-start">
                    <img src={logo} alt="brand logo" className="w-20" />
                    <div className="badge badge-primary">admin</div>
                  </Link>
                </li>
                <hr className="my-2 " />
                <li>
                  <Link to="/dashboard">
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaShoppingBag /> Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaPlusCircle /> Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaEdit /> Manage Items
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/users">
                    <FaUsers /> Users
                  </Link>
                </li>
                <hr className="my-2" />
                {/* Shared nav link */}
                {SharedLinks}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default DashboardLayout;
