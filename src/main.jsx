import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import AddFood from "./components/AddFood";
import UpdateFood from "./components/UpdateFood";
import ViewDetails from "./components/ViewDetails";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import "./index.css";
import MyFoods from "./components/MyFoods";
import MyOrders from "./components/MyOrders";
import AllFoods from "./components/AllFoods";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./Providers/AuthProvider";
import ThemeProvider from "./context/ThemeContext";
import PurchasePage from "./components/PurchasePage";
import Gallery from "./components/Gallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      { path: "all-foods", element: <AllFoods /> },
      {
        path: "food/:id",
        element: <ViewDetails />,
      },
      {
        path: "purchase/:id",
        element: (
          <PrivateRoute>
            <PurchasePage />
          </PrivateRoute>
        ),
      },
      { path: "signIn", element: <SignIn /> },
      { path: "signUp", element: <SignUp /> },
      {
        path: "my-foods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      { path: "gallery", element: <Gallery /> },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
