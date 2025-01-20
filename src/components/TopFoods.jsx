import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://resturant-server-nine.vercel.app/top-foods?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setTopFoods(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top foods:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-800">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 bg-white dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
        Top Foods
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {topFoods.map((food) => (
          <div
            key={food._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={food.foodImage || "https://via.placeholder.com/150"}
              alt={food.foodName}
              className="max-w-full max-h-full object-contain"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {food.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {food.description || "No description available"}
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                ${food.price}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Purchases: {food.purchaseCount || 0}
              </p>
              <Link
                to={`/food/${food._id}`}
                className="block mt-4 text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/all-foods"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          See All Foods
        </Link>
      </div>
    </div>
  );
};

export default TopFoods;
