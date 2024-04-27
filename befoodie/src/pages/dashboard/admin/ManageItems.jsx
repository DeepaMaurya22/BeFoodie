import { Link } from "react-router-dom";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import { FaTrash, FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
function ManageItems() {
  const [menu, loading, refetch] = useMenu(); // Get menu and loading state
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (menu.length === 0) {
    return <div>No menu items found.</div>; // Handle empty data
  }

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="w-full sm:w-[870px]  text-2xl">
      <h2 className="font-semibold">
        Manage All<span className="text-red font-bold"> Menu Items</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table mt-5">
          <thead className="bg-red text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <Link
                    to={`/dashboard/update-menu/${item._id}`}
                    className="btn btn-ghost btn-xs text-[16px]"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-xs text-[15px]"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageItems;
