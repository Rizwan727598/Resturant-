import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  // Access the current theme and toggle function from ThemeContext
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className={`p-2 rounded-full focus:outline-none transition duration-300 ${
        darkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-200 text-gray-800"
      }`}
    >
      {/* Show moon icon for dark mode and sun icon for light mode */}
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
