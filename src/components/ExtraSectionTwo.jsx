import React from "react";

const ExtraSectionTwo = () => {
  return (
    <div className="p-8 bg-gray-200 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Our Happy Customers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center">
          <p className="text-lg italic mb-4">
            "The food here is amazing! Highly recommend the pizza!"
          </p>
          <p className="text-gray-800 dark:text-gray-300 font-bold">
            - John Doeh
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg italic mb-4">
            "Quick delivery and everything tastes so fresh!"
          </p>
          <p className="text-gray-800 dark:text-gray-300 font-bold">
            - Jane Smith
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg italic mb-4">
            "Affordable prices and excellent customer service."
          </p>
          <p className="text-gray-800 dark:text-gray-300 font-bold">
            - Michael Brown
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraSectionTwo;
