import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav
      className={`${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white"
          : "bg-gray-200 text-gray-800"
      } shadow-lg sticky top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-yellow-400">FoodieHub</h1>
          <span
            className={`${
              darkMode ? "text-gray-400" : "text-gray-600"
            } text-sm italic`}
          >
            "Savor Every Bite"
          </span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden focus:outline-none z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <line x1="18" y1="6" x2="6" y2="18" />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 text-sm items-center w-full md:w-auto mt-4 md:mt-0`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-bold"
                  : "hover:text-yellow-400 transition"
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-foods"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-bold"
                  : "hover:text-yellow-400 transition"
              }
              onClick={() => setMenuOpen(false)}
            >
              All Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-bold"
                  : "hover:text-yellow-400 transition"
              }
            >
              Gallery
            </NavLink>
          </li>
        </ul>

        {/* Authentication and Theme Toggle */}
        <div className="flex items-center space-x-4 relative">
          {!user ? (
            <>
              <NavLink
                to="/signIn"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signUp"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {/* Profile Icon */}
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-yellow-400 transition"
              />
              {/* Dropdown Menu */}
              <ul
                className={`absolute right-0 mt-2 py-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 ease-in-out ${
                  dropdownOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible"
                }`}
              >
                <li>
                  <NavLink
                    to="/my-foods"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                  >
                    My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-food"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                  >
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-orders"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                  >
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
