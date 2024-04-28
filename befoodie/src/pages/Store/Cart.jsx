import { FaTrash } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  // const [calculatePrice, setCalculatePrice] = useState([]);

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrement = (item) => {
    fetch(`http://localhost:3000/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8", // Fix typo here
      },
      body: JSON.stringify({
        quantity: item.quantity + 1,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Failed to update item"); // Corrected error message
        }
      })
      .then(() => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });

        setCartItems(updatedCart);
        refetch();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:3000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8", // Fix typo here
        },
        body: JSON.stringify({
          quantity: item.quantity - 1,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Failed to update item"); // Corrected error message
          }
        })
        .then(() => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });

          setCartItems(updatedCart);
          refetch();
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error("Failed to delete item");
            }
          })
          .then(() => {
            refetch(); // Correctly call refetch function
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to delete the item.",
              icon: "error",
            });
          });
      }
    });
  };

  const calculateTotalPrice = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const totalItems = cart.length;
  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Your cart is empty!
        </h2>
        <p>It looks like you haven&apos;t added any items to your cart yet.</p>
        <Link to="/menu">
          <button className="btn bg-red text-white mt-4">Go to Menu</button>
        </Link>
      </div>
    );
  }
  const Totalorder = calculateTotalPrice;
  return (
    <div className="section-container min-h-screen">
      <div className="mb-10 mt-10 text-5xl font-bold text-slate-700">
        Items added to the cart
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-primaryBG text-slate-800 rounded text-[1rem]">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item.title}</td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      // onChange={console.log(item.quantity)}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (newQuantity > 0) {
                          // Ensure quantity is positive
                          handleIncrement({
                            ...item,
                            quantity: newQuantity - item.quantity,
                          }); // Adjust based on new quantity
                        }
                      }}
                      className="w-10 mx-2 text-center overflow-hidden appearance-none"
                    />
                    <button
                      className="btn btn-xs"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </td>
                  <td>{calculatePrice(item).toFixed(2)}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs text-red"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-12 flex flex-col 8 md:flex-row justify-between">
        <div className="md:w-1/2 space-y-3 mt-2">
          <h3 className="font-medium">Customer Details</h3>
          <p>{`Name: ${user.displayName}`}</p>
          <p>{`Email: ${user.email}`}</p>
          <p>{`User_id: ${user.uid}`}</p>
        </div>
        <div className="md:w-1/2 space-y-3 mt-2">
          <h3 className="font-medium">Shopping Details</h3>
          <p>{`Total Items: ${cart.length}`}</p>
          <p>{`Total Price: $${Totalorder.toFixed(2)}`}</p>
          <Link to="/process-checkout">
            <button className="btn bg-red text-white">Procceed Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
