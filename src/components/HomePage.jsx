import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Zoom, Bounce, Fade } from "react-awesome-reveal"; // Corrected imports
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomePage = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://resturant-server-nine.vercel.app/top-foods?limit=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopFoods(data);
        } else {
          console.error("Invalid API response:", data);
          setTopFoods([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top foods:", error);
        setTopFoods([]);
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
    <div className="bg-white dark:bg-gray-800">
      {/* Banner Section */}
      <div className="banner bg-gray-100 dark:bg-gray-900 py-8">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative h-64 md:h-96 w-full bg-cover bg-center">
              <img
                src="https://i.ibb.co.com/C6fjH8B/istockphoto-1829241109-1024x1024.jpg"
                alt="Savor the Flavor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-8">
                <Zoom duration={1200}>
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Savor the Flavor
                  </h2>
                </Zoom>
                <Fade duration={1500} delay={400}>
                  <p className="mb-6 text-lg md:text-2xl text-gray-300">
                    Indulge in a world of gourmet experiences.
                  </p>
                </Fade>
                <Fade duration={1500} delay={800}>
                  <Link
                    to="/all-foods"
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all"
                  >
                    Explore Our Menu
                  </Link>
                </Fade>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Top Foods Sections */}
      <div className="py-16 px-6 bg-white dark:bg-gray-900">
        <Zoom duration={1200}>
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
            Top Foods
          </h2>
        </Zoom>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.isArray(topFoods) && topFoods.length > 0 ? (
            topFoods.map((food, index) => (
              <Bounce key={food._id} cascade damping={0.1} delay={index * 200}>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
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
              </Bounce>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No top foods available.
            </p>
          )}
        </div>
        <Zoom duration={1000}>
          <div className="text-center mt-8">
            <Link
              to="/all-foods"
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              See All Foods
            </Link>
          </div>
        </Zoom>
      </div>
    </div>
  );
};

export default HomePage;
