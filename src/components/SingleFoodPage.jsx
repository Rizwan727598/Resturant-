import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleFoodPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://resturant-server-nine.vercel.app/equipment/${id}`)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!food) {
    return <p className="text-center text-red-500">Food not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p>
        <strong>Price:</strong> ${food.price}
      </p>
      <p>
        <strong>Category:</strong> {food.category}
      </p>
      <p>
        <strong>Description:</strong> {food.description}
      </p>
      <p>
        <strong>Purchase Count:</strong> {food.purchaseCount || 0}
      </p>
      <button
        onClick={() => navigate(`/purchase/${id}`)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Purchase Now
      </button>
    </div>
  );
};

export default SingleFoodPage;
