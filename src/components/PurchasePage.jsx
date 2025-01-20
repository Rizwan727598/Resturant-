import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const PurchasePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch food details
  useEffect(() => {
    fetch(`https://resturant-server-nine.vercel.app/food/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error("Error fetching food details:", err));
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);

    // Validate against available stock
    if (value > food.quantity) {
      Swal.fire({
        title: "Not Enough Stock!",
        text: `You cannot purchase more than ${food.quantity} items.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
      setQuantity(food.quantity);
    } else {
      setQuantity(value);
    }
  };

  const handlePurchase = (e) => {
    e.preventDefault();

    const purchaseData = {
      foodId: food._id,
      foodName: food.foodName,
      price: food.price,
      quantity: parseInt(quantity),
      buyerName: user.displayName || "Anonymous",
      buyerEmail: user.email,
      purchaseDate: new Date().toISOString(),
    };

    fetch("https://resturant-server-nine.vercel.app/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your purchase has been completed successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/my-orders");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to save your order.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error saving order:", error);
        Swal.fire({
          title: "Error!",
          text: `Something went wrong. ${error.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-800">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700 dark:text-gray-100">
        Purchase {food.foodName}
      </h2>

      {/* Warning message when out of stock */}
      {food.quantity === 0 && (
        <div className="mb-6 p-4 text-red-600 bg-red-100 border border-red-400 rounded">
          <p className="text-center font-semibold">
            This product is currently out of stock. You cannot purchase it.
          </p>
        </div>
      )}

      <form onSubmit={handlePurchase} className="space-y-6">
        {/* Food Name */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Food Name
          </label>
          <input
            type="text"
            value={food.foodName}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Price
          </label>
          <input
            type="text"
            value={`$${food.price}`}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
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
            min="1"
            max={food.quantity}
            value={quantity}
            onChange={handleQuantityChange}
            className={`w-full px-4 py-3 border ${
              food.quantity <= 0
                ? "border-red-500 bg-red-100 dark:border-red-400 dark:bg-red-200"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-300`}
            disabled={food.quantity <= 0}
            required
          />
          {food.quantity <= 0 && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">
              This item is out of stock.
            </p>
          )}
        </div>

        {/* Purchase Button */}
        <button
          type="submit"
          disabled={food.quantity === 0}
          className={`w-full py-3 ${
            food.quantity === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300`}
        >
          {food.quantity === 0 ? "Out of Stock" : "Purchase"}
        </button>
      </form>
    </div>
  );
};

export default PurchasePage;
