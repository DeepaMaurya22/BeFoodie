import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function Users() {
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        if (res.headers["content-type"].includes("text/html")) {
          throw new Error("Received HTML response, expected JSON");
        }
        return res.data; // Ensure it's JSON data
      } catch (err) {
        console.error("Error fetching users:", err);
        throw err; // Re-throw error to be handled by useQuery
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (error) {
    return (
      <div>
        <p>Error fetching users. Please try again later.</p>{" "}
        {/* Handle error */}
        <p>{error.message}</p> {/* Display detailed error message */}
      </div>
    );
  }

  // console.log(users);

  const handleMakeUser = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleDeleteUser = (userId) => {
    // Confirmation prompt
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${userId}`) // DELETE request to backend
          .then((response) => {
            Swal.fire("Deleted!", "The user has been deleted.", "success"); // Success feedback
            refetch(); // Refetch users list to update the UI
          })
          .catch((error) => {
            console.error("Error deleting user:", error); // Log errors
            Swal.fire(
              "Error",
              "Failed to delete the user. Please try again.",
              "error"
            ); // Error feedback
          });
      }
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between mx-4 w-full text-2xl">
        <h2 className="font-semibold ">All Users</h2>
        <h5>Total Users: {users.length}</h5>
      </div>
      <div>
        <div className="overflow-x-auto  mt-5 ">
          <table className="table table-zebra md:w-[50rem]">
            {/* head */}
            <thead className="bg-red text-white rounded-lg">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button onClick={() => handleMakeUser(user)}>
                        <FaUsers className="btn btn-xs btn-circle " />
                      </button>
                    )}
                  </td>
                  <td>
                    <button>
                      <FaTrash onClick={() => handleDeleteUser(user._id)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
