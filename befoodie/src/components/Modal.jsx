import { Link } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";

function Modal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
            <button className="btn btn-circle text-xl hover:text-white hover:bg-red hover:border-red">
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
