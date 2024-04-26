import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //   login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //    logout
  const logout = () => {
    return signOut(auth);
  };

  //   update profile
  const updateuserprofile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  //   check signed-in user
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       console.log("access-token");
  //       setUser(currentUser);
  //       const userInfo = { email: currentUser.email };
  //       axios.post("http://localhost:3000/jwt", userInfo).then((res) => {
  //         if (res.data.token) {
  //           localStorage.setItem("access-token", res.data.token);
  //         }
  //       });
  //       console.log("access-token");
  //     } else {
  //       localStorage.removeItem("access-token");
  //       console.log("remove access-token");
  //     }
  //     setLoading(false);
  //   });
  //   return () => {
  //     return unsubscribe();
  //   };
  // }, []);
  // This `useEffect` manages user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Indicate loading while processing

      if (currentUser) {
        console.log("User authenticated:", currentUser.email);
        setUser(currentUser);

        // Fetch JWT token and store it in local storage
        const userInfo = { email: currentUser.email };
        try {
          const response = await axios.post(
            "http://localhost:3000/jwt",
            userInfo
          );
          const token = response.data.token;

          if (token) {
            localStorage.setItem("access-token", token);
          }
        } catch (error) {
          console.error("Failed to get JWT token:", error);
        }
      } else {
        localStorage.removeItem("access-token"); // Clean up token on logout
        console.log("User signed out, removed access token");
      }

      setLoading(false); // Set loading to false when done
    });

    return () => {
      unsubscribe(); // Unsubscribe on component unmount
    };
  }, []); // Empty dependency array to run only on mount

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logout,
    updateuserprofile,
    loading,
    setUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
