import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider"); // Ensure context is within a provider
  }
  return auth;
}

export default useAuth;
