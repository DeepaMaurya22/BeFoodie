import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

function Modal() {
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
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        alert("login successful");
        document.getElementById("my_modal_3").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box ">
          <form
            method="dialog"
            className="card-body"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <form className="card-body" onSubmit={handleSubmit(onSubmit)}> */}
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
                Don&apos;t have an account?
                <Link to="/signup" className="ml-2 underline text-primary">
                  SignUp Now
                </Link>
              </p>
            </div>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_3").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/* Social SignIn */}
          <div className="mb-2 flex justify-center gap-4">
            <button
              className="btn btn-circle text-xl hover:text-white hover:bg-red hover:border-red"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle text-2xl hover:text-white hover:bg-red hover:border-red">
              <FaGithub />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
