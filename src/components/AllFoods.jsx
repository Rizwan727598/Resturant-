import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState(""); // Search input state
  const [loading, setLoading] = useState(true);

  // Fetch foods based on search query
  const fetchFoods = (query = "") => {
    setLoading(true);
    fetch(
      `https://resturant-server-nine.vercel.app/foods?name=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFoods(); // Fetch all foods initially
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoods(search.trim());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-800">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-800">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
          All Foods
        </h2>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mr-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food._id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                <img
                  src={food.foodImage || "https://via.placeholder.com/150"}
                  alt={food.foodName}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {food.foodName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Category: {food.foodCategory}
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-bold mt-2">
                  Price: ${food.price}
                </p>
                <Link
                  to={`/food/${food._id}`}
                  className="block mt-4 text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No foods found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
