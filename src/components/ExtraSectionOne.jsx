import React from "react";

const ExtraSectionOne = () => {
  return (
    <div className="p-8 bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Why Choose OurFoods?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center">
          <img
            src="https://example.com/freshness.jpg"
            alt="Fresh Ingredients"
            className="w-24 mx-auto mb-5"
          />
          <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We ensure that every dish is made with the freshest ingredients.
          </p>
        </div>
        <div className="text-center">
          <img
            src="https://example.com/fast-delivery.jpg"
            alt="Fast Delivery"
            className="w-24 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get your food delivered quickly and safely to your doorstep.
          </p>
        </div>
        <div className="text-center">
          <img
            src="https://example.com/affordable.jpg"
            alt="Affordable Prices"
            className="w-24 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Affordable Prices</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enjoy delicious meals at the most affordable prices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraSectionOne;
