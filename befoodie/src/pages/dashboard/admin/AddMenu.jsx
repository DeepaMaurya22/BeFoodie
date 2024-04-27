import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function AddMenu() {
  const { register, handleSubmit, reset } = useForm(); // Include reset
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData(); // Use FormData for file uploads
      formData.append("image", data.image[0]); // Add the file to FormData

      const response = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Correct content type for file uploads
        },
      });

      console.log("Image hosted successfully:", response.data);

      if (response.data.success) {
        const menuItem = {
          title: data.title,
          category: data.category,
          price: parseFloat(data.price),
          description: data.description,
          image: response.data.data.display_url,
        };

        const postMenuItem = await axiosSecure.post("/menu", menuItem);

        if (postMenuItem.status === 200) {
          Swal.fire(`${data.title} is added`);
          reset(); // Clear form data
        }
      }
    } catch (error) {
      console.error("Error hosting image:", error);
    }
  };

  return (
    <div className="w-full sm:w-[870px] px-4 mx-auto text-2xl">
      <h2 className="font-semibold">
        Add a New <span className="text-red font-bold">Menu Item</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("title", { required: true })} // Add validation
            />
          </label>
        </div>

        <div className="flex justify-between items-middle gap-6 mt-3">
          <div className="w-full">
            <div className="label">
              <p className="label-text">Category*</p>
            </div>
            <select
              {...register("category", { required: true })} // Add validation
              className="select select-bordered w-full"
              defaultValue="default"
            >
              <option value="default">Choose Category</option>
              <option>Pizza</option>
              <option>Veg</option>
              <option>NonVeg</option>
              <option>Dessert</option>
              <option>FastFood</option>
              <option>Drinks</option>
            </select>
          </div>

          <div className="w-full">
            <div className="label">
              <p className="label-text">Price*</p>
            </div>
            <input
              type="text"
              placeholder="Type here"
              {...register("price", { required: true })} // Add validation
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="w-full form-control mt-6">
          <div className="label">
            <p className="label-text">Recipe Details*</p>
          </div>
          <textarea
            placeholder="Type here the Recipe"
            {...register("description", { required: true })} // Add validation
            className="input input-bordered w-full h-24 p-2"
          />
        </div>

        <div className="form-control mt-6">
          <input
            type="file"
            {...register("image", { required: true })} // Add validation
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>

        <button className="btn bg-red text-white px-6 mt-5" type="submit">
          <FaUtensils className="mr-1" /> Add Item
        </button>
      </form>
    </div>
  );
}

export default AddMenu;
