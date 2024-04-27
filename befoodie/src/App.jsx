import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
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
import AddMenu from "./pages/dashboard/admin/AddMenu";
import ManageItems from "./pages/dashboard/admin/ManageItems";
import UpdateMenu from "./pages/dashboard/admin/UpdateMenu";
import "./App.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      {
        path: "cart-page",
        element: (
          <PrivateRouter>
            <Cart />
          </PrivateRouter>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRouter>
            <UpdateProfile />
          </PrivateRouter>
        ),
      },
    ],
  },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "manage-items", element: <ManageItems /> },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:3000/menu/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch menu item");
          }
          return response.json(); // Return fetched data
        },
      },
      { path: "add-menu", element: <AddMenu /> },
      { path: "users", element: <Users /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />; // Use RouterProvider to render the data router
}

export default App;
