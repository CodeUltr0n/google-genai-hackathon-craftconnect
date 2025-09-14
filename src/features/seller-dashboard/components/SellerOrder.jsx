import { useEffect, useState } from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500 mt-1 text-lg">{subtitle}</p>
    </div>
  );
};

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      //  const response = await fetch(`/api/seller/orders`);
      // const data = await response.json();

      // Mock DB Data
      const MockDataFromDB = [
        { id: "BB-2025-0914", date: "Sep 14, 2025", customerName: "Rohan Mehta", item: "Blue Pottery Vase", price: 2500, status: "Processing" },
        { id: "BB-2025-0912", date: "Sep 12, 2025", customerName: "Priya Singh", item: "Chikankari Kurta", price: 2800, status: "Shipped" },
        { id: "BB-2025-0910", date: "Sep 10, 2025", customerName: "Amit Desai", item: "Bandhani Silk Dupatta", price: 3200, status: "Delivered" },
      ];

      setOrders(MockDataFromDB);
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  // Helper: status colors
  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-600 space-y-4">
        <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <div>Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incoming Orders"
        subtitle="Manage and fulfill new orders from your customers."
      />
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50 font-semibold text-gray-700">
          <div>Customer</div>
          <div>Item</div>
          <div>Date</div>
          <div className="text-center">Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 grid grid-cols-6 items-center gap-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{order.customerName}</p>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
              </div>
              <p className="text-gray-600 text-sm">{order.item}</p>
              <p className="text-gray-600 text-sm">{order.date}</p>
              <p className="text-center font-semibold text-gray-800">
                ₹{order.price.toLocaleString("en-IN")}
              </p>
              <div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={`w-full text-xs font-semibold rounded-full border-2 py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-indigo-500 transition-colors ${getStatusStyles(
                    order.status
                  )}`}
                >
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
              <div>
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => alert(`Viewing order ${order.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;