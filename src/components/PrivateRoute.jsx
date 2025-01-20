import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex bg-white dark:bg-gray-800 justify-center items-center h-32">
        <div className="spinner border-4 border-yellow-400 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
