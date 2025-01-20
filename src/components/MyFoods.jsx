import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { NavLink } from "react-router-dom";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(
        `https://resturant-server-nine.vercel.app/foods?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setFoods(data))
        .catch((error) => console.error("Error fetching foods:", error));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-8">
        My Foods
      </h2>
      {foods.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't added any food items yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden border dark:border-gray-600 hover:shadow-2xl transition duration-300"
            >
              <img
                src={food.foodImage || "https://via.placeholder.com/150"}
                alt={food.foodName || "Food Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {food.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Category: {food.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Price: ${food.price}
                </p>
                <div className="flex justify-end items-center mt-4">
                  <NavLink
                    to={`/update-food/${food._id}`}
                    className="block px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Update
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFoods;
