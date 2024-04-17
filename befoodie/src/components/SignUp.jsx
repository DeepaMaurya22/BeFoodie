import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, signUpWithGmail } = useContext(AuthContext);

  // redirecting to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    try {
      const result = await createUser(email, password);
      // Signed up successfully
      const user = result.user;
      alert("SignUp successful");
      document.getElementById("my_modal_3").close();
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use");
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };
  return (
    <>
      <div className="mx-auto max-w-md w-full shadow my-5 rounded-xl p-8">
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
            <div className="form-control mt-5">
              <button
                type="submit"
                className="btn bg-red text-white  hover:bg-primaryBG hover:text-red hover:border-red"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center text-sm mt-2">
              <p>
                Have an account?
                <button
                  className="ml-2 underline text-primary"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
                <Modal />
              </p>
            </div>
          </form>

          {/* Social SignIn */}
          <div className="mb-2 flex justify-center gap-4 mt-4">
            <button className="btn btn-circle text-xl hover:text-white hover:bg-red hover:border-red">
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
    </>
  );
}

export default SignUp;
