import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ViewDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch food details from the backend
    fetch(`https://resturant-server-nine.vercel.app/food/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
        setItem(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-800">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (!item || Object.keys(item).length === 0) {
    return (
      <p className="text-center text-red-500 bg-white dark:bg-gray-800 h-screen flex items-center justify-center">
        Item not found or no details available!
      </p>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.name || "Unnamed Item"}
            className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700"
          />
          <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
            {item.category || "Unknown Category"}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {item.foodName || "Unnamed Item"}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Price:
              </span>{" "}
              ${item.price || "Not Available"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Description:
              </span>{" "}
              {item.description || "No description available"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Stock:
              </span>{" "}
              {item.quantity || "Unavailable"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Purchases:
              </span>{" "}
              {item.purchaseCount || 0}
            </p>

            {/* Purchase Button */}
            <Link
              to={`/purchase/${item._id}`}
              className="block mt-4 text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Purchase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
