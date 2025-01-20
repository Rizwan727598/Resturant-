import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import PremiumFooter from "./PremiumFooter"; // Updated footer to use PremiumFooter
import { Outlet } from "react-router-dom";
// import TopFoods from "./TopFoods";
import ExtraSectionOn from "./ExtraSectionOne";
import ExtraSectionTwo from "./ExtraSectionTwo";
const Layout = () => {
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-800 flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
        {/* Show TopFoods, ExtraSectionOne, and ExtraSectionTwo only on the home page */}
        {location.pathname === "/" && (
          <>
            {/* <TopFoods /> */}
            <ExtraSectionOn />
            <ExtraSectionTwo />
          </>
        )}
      </main>

      {/* Footer */}
      <footer>
        <PremiumFooter />
      </footer>
    </div>
  );
};

export default Layout;
