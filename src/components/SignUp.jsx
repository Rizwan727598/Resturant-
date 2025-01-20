import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const photoURL = e.target.photoURL.value.trim();

    setError(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must include uppercase, lowercase letters, and be at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, { displayName: name, photoURL })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: `Welcome, ${user.displayName || "User"}!`,
            });

            e.target.reset();
          })
          .catch((err) => {
            console.error("Profile Update Error:", err.message);
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: "Please try again.",
            });
          });
      })
      .catch((err) => {
        console.error("Registration Error:", err.message);

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Please try again.",
        });
      });
  };

  return (
    <div className="hero bg-white dark:bg-gray-800 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
            Sign Up Now!
          </h1>
          <p className="py-6 text-gray-600 dark:text-gray-300">
            Join us today! Fill in your details to create an account.
          </p>
        </div>
        <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-800 dark:text-gray-300">
                  Name
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input bg-white dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-800 dark:text-gray-300">
                  Email
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input bg-white dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="photoURL" className="label">
                <span className="label-text text-gray-800 dark:text-gray-300">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                className="input bg-white dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text text-gray-800 dark:text-gray-300">
                  Password
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input bg-white dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
