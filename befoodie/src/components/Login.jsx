import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        // const userInfo = {
        //   name: data.name,
        //   email: data.email,
        // };
        // axios.post("http://localhost:3000/users", userInfo).then((response) => {
        //   alert("SignUp successful");
        //   navigate(from, { replace: true });
        // });
        alert("Login successful");
        document.getElementById("my_modal_3").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage("Provide a correct email and password");
      });
  };

  // google signin
  const handleRegister = () => {
    // console.log("registering");
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user?.displayName,
          email: user.email,
          // photoURL:data.photoURL
        };

        axios
          .post("http://localhost:3000/users", userInfo)
          .then((response) => {
            if (response.status === 200) {
              console.log("User created successfully");
              alert("Sign-Up successful");
            } else {
              console.warn("Unexpected response status:", response.status);
            }
          })
          .catch((error) => {
            if (error.response) {
              console.error("Axios error:", error.response.data); // Log the response data for insights
              if (error.response.status === 409) {
                alert("User already exists"); // Handle existing user error
              } else if (error.response.status === 400) {
                alert("Invalid input data");
              } else {
                alert("Something went wrong. Please try again.");
              }
            } else {
              console.error("Error with Axios request:", error.message); // Log if the request failed without response
              alert("Network or server error. Please try again later.");
            }
          });

        document.getElementById("my_modal_3").close();
      })
      .catch((error) => {
        if (error.response && error.response.status === 302) {
          console.error("Redirected to:", error.response.headers.location);
          // navigate(error.response.headers.location); // Redirect if needed
        }
        console.error("Axios error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="mx-auto max-w-md  w-full shadow my-5 rounded-xl p-8">
        <div className="w-4/5 mx-auto">
          <form
            method="dialog"
            className="p-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
                autoComplete="current-password"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
                autoComplete="current-password"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* error */}
            {errorMessage ? (
              <p className="text-red text-xs italic">{errorMessage}</p>
            ) : (
              ""
            )}
            <div className="form-control mt-5">
              <button
                type="submit"
                className="btn bg-red text-white  hover:bg-primaryBG hover:text-red hover:border-red"
              >
                Login
              </button>
            </div>
            <div className="text-center text-sm mt-2">
              <p>
                Have an account?
                <Link to="/signup" className="ml-2 underline text-primary">
                  SignUp Now
                </Link>
              </p>
            </div>
          </form>

          {/* Social SignIn */}
          <div className="mb-2 flex justify-center gap-4 mt-4">
            <button
              className="btn btn-circle text-xl hover:text-white hover:bg-red hover:border-red"
              onClick={handleRegister}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle text-2xl hover:text-white hover:bg-red hover:border-red">
              <FaGithub />
            </button>
          </div>
        </div>
        <Link
          to="/"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </Link>
      </div>
    </div>
  );
}

export default Login;
