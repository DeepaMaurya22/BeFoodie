import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function useCart() {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/carts?email=${user?.email}`
      );
      return res.json();
    },
  });
  return [cart, refetch];
}

export default useCart;
