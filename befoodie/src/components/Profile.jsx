import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
function Profile({ user }) {
  const { logout, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    // Pass setUser as a parameter
    return logout()
      .then(() => setUser(null))
      .catch((error) => console.error("Logout error:", error.message));
  };
  // const isAdmin = false;
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {/* {isAdmin && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )} */}
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
