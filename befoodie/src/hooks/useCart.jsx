import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function useCart() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      // Ensure that the token is retrieved and added to the request headers
      if (!token) {
        throw new Error("Access token not found. Please log in again.");
      }

      const res = await fetch(
        `http://localhost:3000/carts?email=${user?.email}`,
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

  return [cart, refetch];
}

export default useCart;
