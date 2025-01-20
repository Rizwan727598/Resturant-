import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import moment from "moment";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for the logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://resturant-server-nine.vercel.app/orders?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  // Handle delete order
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://resturant-server-nine.vercel.app/orders/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            if (data.message) {
              const remainingOrders = orders.filter(
                (order) => order._id !== id
              );
              setOrders(remainingOrders);
              Swal.fire("Deleted!", "Your order has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error("Error deleting order:", error);
            Swal.fire("Error!", "Failed to delete the order.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-8">
        My Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Food Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Buyer</th>
                <th className="border px-4 py-2">Order Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                >
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2">{order.foodName}</td>
                  <td className="border px-4 py-2">${order.price}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2">{order.buyerName}</td>
                  <td className="border px-4 py-2">
                    {moment(order.purchaseDate).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
