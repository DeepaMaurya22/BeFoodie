// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const useAdmin = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     refetch,
//     data: isAdmin,
//     isPending,
//     isAdminLoading,
//   } = useQuery({
//     queryKey: ["isAdmin", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//       // console.log(res.data);
//       return res.data?.admin;
//     },
//   });
//   return [isAdmin, isAdminLoading];
// };

// export default useAdmin;

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin = false, // Default value to avoid undefined errors
    isLoading: isAdminLoading,
    error, // Capture errors for handling
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        // If email is undefined, return a default value or throw an error
        throw new Error("User email is required to check admin status.");
      }

      const res = await axiosSecure.get(`/users/admin/${user.email}`);

      if (res.status !== 200 || res.data === undefined) {
        // Handle non-200 status or unexpected data
        throw new Error("Failed to fetch admin status.");
      }

      return res.data; // Assuming the response contains a valid object
    },
    retry: 1, // Limit retry attempts to avoid infinite retries
  });

  return [isAdmin, isAdminLoading, error]; // Return error to help with error handling
};

export default useAdmin;
