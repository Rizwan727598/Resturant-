import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch food details by ID
    fetch(`https://resturant-server-nine.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food details:", error);
        setLoading(false);
      });
  }, [id]);
  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    // Normalize data types before sending to the backend
    // const normalizedData = {
    //   name: updatedData.name.trim(),
    //   category: updatedData.category.trim(),
    //   price: parseFloat(updatedData.price), // Ensure price is a number
    //   description: updatedData.description.trim(),
    //   image: updatedData.image.trim(),
    // };
    const normalizedData = {
      name: updatedData.name.trim(),
      category: updatedData.category.trim(),
      price: parseFloat(updatedData.price), // Ensure price is a number
      description: updatedData.description.trim(),
      foodImage: updatedData.image.trim(), // Use the correct key for the image
    };

    fetch(`https://resturant-server-nine.vercel.app/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(normalizedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Food updated successfully.") {
          Swal.fire("Success!", data.message, "success");
          navigate("/my-foods");
        } else if (data.message === "No Changes!") {
          Swal.fire(
            "Info",
            "No updates were made to the food details.",
            "info"
          );
        } else {
          Swal.fire("Error!", "Failed to update food details.", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to update food details.", "error");
        console.error("Error updating food:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-800">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-800">
        <p className="text-red-500 text-lg font-semibold">
          Food not found or no details available!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-100 mb-8">
        Update Food Details
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Food Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={food.name}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            defaultValue={food.category}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            defaultValue={food.price}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={food.description}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            defaultValue={food.Image}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Update Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Update Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFood;
