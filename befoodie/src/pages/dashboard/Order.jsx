import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
function Order() {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      // Ensure that the token is retrieved and added to the request headers
      if (!token) {
        throw new Error("Access token not found. Please log in again.");
      }

      const res = await fetch(
        `http://localhost:3000/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`, // Include the JWT token in the request headers
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch cart data: ${res.statusText}`);
      }

      return res.json(); // Parse the JSON response
    },
  });

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="section-container min-h-screen">
      <div className="mb-10 mt-10 text-5xl font-bold text-slate-700 flex justify-center w-full">
        <h2>
          Track All Your <span className="text-red font-bold">Orders!</span>
        </h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table mt-5">
            <thead className="bg-red text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>transactionId</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>{item.transactionId}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                  <td className="text-red font-semibold">
                    <Link to="/contact">Contact</Link>
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

export default Order;
