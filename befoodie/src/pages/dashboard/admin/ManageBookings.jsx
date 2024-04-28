import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Swal from "sweetalert2";
import { BsDash } from "react-icons/bs";

// import Swal from "sweetalert2";

function ManageBookings() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/payments/all");
        if (res.headers["content-type"].includes("text/html")) {
          throw new Error("Received HTML response, expected JSON");
        }
        console.log(res.data);
        console.log(orders);
        return res.data;
      } catch (err) {
        console.error("Error fetching users:", err);
        throw err;
      }
    },
  });

  const handleConfirm = async (item) => {
    console.log(item.status);
    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      console.log(res.data);
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment Confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="md:w-[60rem] mt-5">
      <div className="flex items-center justify-between text-2xl ">
        <h2 className="font-semibold ">All Orders</h2>
        <h5>Total Orders: {orders.length}</h5>
      </div>
      <div>
        <div className="overflow-x-auto  mt-5">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-red text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>TransactionId</th>
                {/* <th>Item Name</th>
                <th>Qunantity</th> */}
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.email}</td>
                  <td>{order.transactionId}</td>
                  {/* <td>
                    {order.itemName.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </td> */}
                  {/* <td>{order.quantity}</td> */}
                  <td>${order.price}</td>
                  <td>{order.status}</td>
                  {/* <td>{order.itemName}</td> */}
                  <td className="text-center">
                    {order.status === "confirmed" ? (
                      <button>
                        <TiTick className="btn btn-xs btn-circle" />
                      </button>
                    ) : (
                      <button>
                        <BsDash
                          className="btn btn-xs btn-circle"
                          onClick={() => handleConfirm(order)}
                        />
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <button>
                      {/* <FaTrash onClick={() => handleDeleteorder(order._id)} /> */}
                      <FaTrash />
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

export default ManageBookings;
