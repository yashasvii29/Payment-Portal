import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch order history on component load
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  // Fetch order history from the backend
  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get('/api/orders'); // API to fetch user orders
      setOrderHistory(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/pay', { amount }); // API for payment
      alert('Payment Successful! Order ID: ' + response.data.orderId);
      fetchOrderHistory(); // Refresh order history
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment Failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-500 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p>Welcome! Manage your payments and orders here.</p>
      </header>

      <main className="p-6">
        {/* Payment Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-gray-700">Amount (USD)</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </section>

        {/* Order History Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Order History</h2>
          {orderHistory.length === 0 ? (
            <p className="text-gray-700">No orders found.</p>
          ) : (
            <ul className="space-y-4">
              {orderHistory.map((order) => (
                <li
                  key={order._id}
                  className="border rounded-lg p-4 flex justify-between"
                >
                  <div>
                    <p className="font-bold">Order ID: {order._id}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-bold">${order.amount.toFixed(2)}</p>
                    <p>Status: {order.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="bg-purple-500 text-white text-center py-4">
        &copy; 2024 Payment Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default Payment;
