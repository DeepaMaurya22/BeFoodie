import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom"; // Import useNavigate

function UpdateMenu() {
  const item = useLoaderData(); // Get the menu item data
  const { register, handleSubmit, reset } = useForm(); // Include form management
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Initialize useNavigate

  // Image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    try {
      let imageUrl = item.image; // Retain the current image URL if no new image

      if (data.image && data.image.length > 0) {
        // If a new image is uploaded
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const response = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          imageUrl = response.data.data.display_url; // Use the new image
        }
      }

      const updatedMenuItem = {
        title: data.title,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description,
        image: imageUrl, // Retain or use new image
      };

      const response = await axiosSecure.patch(
        `/menu/${item._id}`,
        updatedMenuItem
      );

      if (response.status === 200) {
        // If update is successful
        Swal.fire("Success", `${data.title} has been updated.`, "success");
        reset(); // Reset the form
        navigate("/dashboard/manage-items"); // Navigate to Manage Items
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update the menu item.", "error");
      console.error("Error updating menu item:", error);
    }
  };

  if (!item) {
    return <div>Loading...</div>; // Handle loading or no data state
  }

  return (
    <div className="w-full sm:w-[870px] px-4 mx-auto text-2xl">
      <h2 className="font-semibold">
        Update <span className="text-red font-bold">Menu Item</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-control w/full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w/full"
              defaultValue={item.title} // Load default value from data
              {...register("title", { required: true })}
            />
          </label>
        </div>

        <div className="flex justify-between gap-6 mt-3">
          {/* Category */}
          <div className="w/full">
            <div className="label">
              <p className="label-text">Category*</p>
            </div>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w/full"
              defaultValue={item.category}
            >
              <option value="Pizza">Pizza</option>
              <option value="Veg">Veg</option>
              <option value="NonVeg">NonVeg</option>
              <option value="Dessert">Dessert</option>
              <option value="FastFood">FastFood</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div className="w/full">
            <div className="label">
              <p className="label-text">Price*</p>
            </div>
            <input
              type="text"
              placeholder="Type here"
              defaultValue={item.price}
              {...register("price", { required: true })}
              className="input input-bordered w/full"
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div className="w/full form-control mt-6">
          <div className="label">
            <p className="label-text">Recipe Details*</p>
          </div>
          <textarea
            type="text"
            placeholder="Type the recipe details here"
            defaultValue={item.description}
            {...register("description", { required: true })}
            className="input input-bordered w/full h-24"
          />
        </div>

        {/* Optional File Input */}
        <div className="form-control mt-6">
          <input
            type="file"
            {...register("image")} // Optional file input
            className="file-input file-input-bordered w/full max-w-xs"
          />
        </div>

        <button className="btn bg-red text-white px-6 mt-5" type="submit">
          <FaUtensils className="mr-1" /> Update Item
        </button>
      </form>
    </div>
  );
}

export default UpdateMenu;
