import React from "react";

const SimplePremiumFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              Welcome to Foodie's Delight, where we bring you the finest
              culinary experiences. From world-class dishes to local favorites,
              we are here to satisfy your cravings.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/menu" className="hover:text-yellow-500 transition">
                  Menu
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span>&#9993;</span>
                <span>support@foodiesdelight.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>&#9742;</span>
                <span>+1 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>&#127968;</span>
                <span>123 Culinary Lane, Foodie City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Foodie's Delight. All rights
            reserved.
          </p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-yellow-500 transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-service"
                className="hover:text-yellow-500 transition"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-yellow-500 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default SimplePremiumFooter;
