import React from "react";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  return (
    <div>
      <ThemeToggle />
      <div className="p-8 bg-red-600">
        <h1 className="text-2xl">Hello, Tailwind CSS with Theme Toggle!</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This text will change color based on the theme.
        </p>
      </div>
    </div>
  );
};

export default App;
