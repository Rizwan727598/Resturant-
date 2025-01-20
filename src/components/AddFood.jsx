import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    foodCategory: "",
    quantity: "",
    price: "",
    foodOrigin: "",
    description: "",
    addedBy: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Post data to the backend
    fetch("https://resturant-server-nine.vercel.app/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Food item has been added successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });

          // Reset the form
          setFormData({
            foodName: "",
            foodImage: "",
            foodCategory: "",
            quantity: "",
            price: "",
            foodOrigin: "",
            description: "",
            addedBy: {
              name: user?.displayName || "",
              email: user?.email || "",
            },
          });
        }
      })
      .catch((err) => {
        console.error("Error adding food item:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to add food item. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        Add New Food Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Food Name */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Food Name
          </label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Enter food name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Food Image */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Food Image URL
          </label>
          <input
            type="url"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Food Category */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Food Category
          </label>
          <input
            type="text"
            name="foodCategory"
            value={formData.foodCategory}
            onChange={handleChange}
            placeholder="Enter category (e.g., Italian, Fast Food)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>

        {/* Food Origin */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Food Origin (Country)
          </label>
          <input
            type="text"
            name="foodOrigin"
            value={formData.foodOrigin}
            onChange={handleChange}
            placeholder="Enter food origin (e.g., Italy, USA)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
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
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter ingredients, making procedure, etc."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddFood;
