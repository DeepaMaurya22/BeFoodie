import { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import { useNavigate, useLocation } from "react-router-dom";

function Card({ item }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const isInCart = cart.some((cartItem) => cartItem.menuItemId === item._id);

  const handleAddtoCart = (item) => {
    if (isInCart) {
      Swal.fire({
        icon: "warning",
        title: "Item already in cart",
        text: "This item is already in your cart.",
      });
      return;
    }

    if (user && user.email) {
      const { image, title, price, _id } = item;
      const cartItem = {
        menuItemId: _id,
        title: title,
        quantity: 1,
        image: image,
        price: price,
        email: user.email,
      };

      fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item Added",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch(); // Re-fetch the cart items
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `Unexpected error: ${res.status}`,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `An error occurred: ${err.message}`,
          });
        });
    } else {
      Swal.fire({
        title: "Please Login?",
        text: "Please create an account or login!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SignUp",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-md h-[22rem] overflow-hidden w-[20rem] rounded-lg p-3 ">
        <figure className="h-[13rem] bg-center bg-cover rounded-md">
          <div
            className={`heart absolute z-10 right-4 top-4 rounded-full p-2 bg-white cursor-pointer ${
              isHeartFilled ? "text-rose-500" : "text-slate-500"
            }`}
            onClick={handleHeartClick}
          >
            <FaHeart />
          </div>

          <img src={item.image} alt="Item" />
        </figure>
        <div className="card-body pb-0">
          <h2 className="card-title">{item.title}</h2>
          <p
            className="font-normal text-[0.8rem] tracking-wider"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {item.description}
          </p>
          <div className="card-actions justify-start">
            <button
              className={`btn ${
                isInCart ? "bg-green-800 text-slate-800" : "bg-red"
              } text-white hover:bg-red`}
              onClick={() => handleAddtoCart(item)}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
